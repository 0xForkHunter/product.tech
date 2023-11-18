//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract ProductKeys {
  // Fee percentages
  uint256 public holderFeePercent;
  uint256 public productFeePercent;

  // productKeys (productSlug string, buyer address, amount uint256)  
  mapping(string => mapping(address => uint256)) public productKeys;

  // productHolderFees (productSlug string, holder address, amount uint256)  
  mapping(string => mapping(address => uint256)) public productHolderFees;

  // fees  (owner address, productSlug string)
  mapping(address => string) public owners;

  // productKeysSupply (productSlug string, supply uint256)  
  mapping(string => uint256) public productKeysSupply;

  // safes  (productSlug string, safe address)
  mapping(string => address) public safes;

  /**
    * Event emitted when a new Product is created.
    * _safe the address to store product fees
    * _owner the address of the product owner
    * _productSlug the product identifier
    */
  event ProductCreated(
    address indexed _safe,
    address indexed _owner,
    string _productSlug
  );

  /**
    * Event emitted when a Product key is bought.
    * _productSlug the Product slug from where the keys are bought
    * _trader is the buyer of the keys
    * _amount_of_keys is the amount of keys bought
    * _ethSpent is the full amount of eth spent
    * _ownerFee is the fee paid to the owner
    */
  event ProductKeyBought(
    string  _productSlug,
    address indexed _trader,
    uint256 _amountOfKeys,
    uint256 _ethSpent,
    uint256 _ownerFee,
    uint256 _sellPrice,
    uint256 _nextPrice
  );

  /**
    * Event emitted when a Product key is sold.
    * _productSlug the Product slug from where the keys are sold
    * _trader is the buyer of the keys
    * _amount_of_keys is the amount of keys sold
    * _ethSpent is the full amount of eth return
    * _ownerFee is the fee paid to the owner
    */
  event ProductKeySold(
    string  _productSlug,
    address indexed _trader,
    uint256 _amountOfKeys,
    uint256 _ethSpent,
    uint256 _ownerFee,
    uint256 _sellPrice,
    uint256 _nextPrice
  );

  /**
    * Contract initialization.
    */
  constructor(uint256 productFee, uint256 holderFee) {
    productFeePercent = productFee;
    holderFeePercent = holderFee;
  }

  function createProduct(address safe, string memory name) public {
    require(safes[name] == address(0), "Product already exists");
    safes[name] = safe;
    owners[msg.sender] = name;

    uint256 price = getPrice(0);
    uint256 nextPrice = getPrice(1);

    productKeys[name][msg.sender]++;
    productKeysSupply[name]++;
    emit ProductCreated(safe, msg.sender, name);
    emit ProductKeyBought(name, msg.sender, 1, 0, 0, price, nextPrice);
  }

  function getPrice(uint256 supply) public pure returns (uint256) {
    return supply * 1e15;
  }

  function getBuyPrice(string memory productSlug) public view returns (uint256) {
    return getPrice(productKeysSupply[productSlug]);
  }

  function getSellPrice(string memory productSlug) public view returns (uint256) {
    return getPrice(productKeysSupply[productSlug] - 1);
  }

  function getBuyPriceAfterFee(string memory productSlug) public view returns (uint256) {
    uint256 price = getBuyPrice(productSlug);

    uint256 productFee = (price * productFeePercent) / 1 ether;
    return price + productFee;
  }

  function getSellPriceAfterFee(string memory productSlug) public view returns (uint256) {
    uint256 price = getSellPrice(productSlug);

    uint256 subjectFee = price * productFeePercent / 1 ether;
    return price - subjectFee;
  }

  function buyKey(string memory productSlug) public payable {
    uint256 supply = productKeysSupply[productSlug];
    require(supply != 0, "Product does not exist yet");

    uint256 nextPrice = getPrice(supply + 1);
    uint256 price = getPrice(supply);
    uint256 subjectFee = price * productFeePercent / 1 ether;
    require(msg.value >= price + subjectFee, "Insufficient payment");
    
    productKeys[productSlug][msg.sender] += 1;
    productKeysSupply[productSlug] = supply + 1;
    emit ProductKeyBought(
      productSlug,
      msg.sender,
      1,
      price + subjectFee,
      subjectFee,
      price,
      nextPrice
    );

    address safe = safes[productSlug];

    (bool success1, ) = safe.call{value: subjectFee}("");

    require(success1, "Funds transfer failed");
  }

  function sellKeys(string memory productSlug) public payable {
    uint256 supply = productKeysSupply[productSlug];

    require(supply > 1, "Cannot sell last key");
    require(productKeys[productSlug][msg.sender] >= 1, "Insufficient keys");


    uint256 price = getPrice(supply - 1);    
    uint256 subjectFee = price * productFeePercent / 1 ether;

    uint256 nextPrice = 0;
    
    if (price > 0) {
      nextPrice = getPrice(supply - 2);
    }

    productKeys[productSlug][msg.sender] -= 1;
    productKeysSupply[productSlug] = supply - 1;

    emit ProductKeySold(
      productSlug,
      msg.sender,
      1,
      price - subjectFee,
      subjectFee,
      price,
      nextPrice
    );

    address safe = safes[productSlug];

    // transfer to the buyer
    (bool success1, ) = msg.sender.call{value: price - subjectFee}("");

    // transfer to the owner
    (bool success2, ) = safe.call{value: subjectFee}("");

    require(success1 && success2, "Funds transfer failed");
  }

  function claimHolderFees(string memory productSlug) public payable {
    // TODO on a next iteration
  }
}

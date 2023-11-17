//SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.19;

contract ProductKeys {
  // Fee percentages
  uint256 public protocolFeePercent;
  uint256 public productFeePercent;

  // productKeys (productSlug string, buyer address, amount uint256)  
  mapping(string => mapping(address => uint256)) public productKeys;

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
    * _buyer is the buyer of the keys
    * _amount_of_keys is the amount of keys bought
    * _ethSpent is the full amount of eth spent
    * _ownerFee is the fee paid to the owner
    */
  event ProductKeyBought(
    string  _productSlug,
    address indexed _buyer,
    uint256 _amountOfKeys,
    uint256 _ethSpent,
    uint256 _ownerFee
  );

  /**
    * Event emitted when a Product key is sold.
    * _productSlug the Product slug from where the keys are sold
    * _buyer is the buyer of the keys
    * _amount_of_keys is the amount of keys sold
    * _ethSpent is the full amount of eth return
    * _ownerFee is the fee paid to the owner
    */
  event productKeysold(
    string  _productSlug,
    address indexed _buyer,
    uint256 _amountOfKeys,
    uint256 _ethSpent,
    uint256 _ownerFee
  );

  /**
    * Contract initialization.
    */
  constructor(uint256 productFee) {
    productFeePercent = productFee;
  }

  function createProduct(address safe, string memory name) public {
    require(safes[name] == address(0), "Product already exists");
    safes[name] = safe;
    owners[msg.sender] = name;

    productKeys[name][msg.sender]++;
    productKeysSupply[name]++;
    emit ProductCreated(safe, msg.sender, name);
    emit ProductKeyBought(name, msg.sender, 1, 0, 0);
  }

  function getPrice(uint256 supply, uint256 amount) public pure returns (uint256) {
    uint256 sum1 = supply == 0 ? 0 : (supply - 1 )* (supply) * (2 * (supply - 1) + 1) / 6;
    uint256 sum2 = supply == 0 && amount == 1 
    ? 
    0 : 
    (supply + amount - 1) * (supply + amount) * (2 * (supply + amount - 1) + 1) / 6;
    uint256 summation = sum2 - sum1;
    return summation * 1 ether / 16000;
  }

  function getBuyPrice(string memory productSlug, uint256 amount) public view returns (uint256) {
    return getPrice(productKeysSupply[productSlug], amount);
  }

  function getSellPrice(string memory productSlug, uint256 amount) public view returns (uint256) {
    return getPrice(productKeysSupply[productSlug] - amount, amount);
  }

  function getBuyPriceAfterFee(string memory productSlug, uint256 amount) public view returns (uint256) {
    uint256 price = getBuyPrice(productSlug, amount);

    uint256 subjectFee = (price * productFeePercent) / 1 ether;
    return price + subjectFee;
  }

  function getSellPriceAfterFee(string memory productSlug, uint256 amount) public view returns (uint256) {
    uint256 price = getSellPrice(productSlug, amount);

    uint256 subjectFee = price * productFeePercent / 1 ether;
    return price - subjectFee;
  }

  function buyKey(string memory productSlug) public payable {
    uint256 supply = productKeysSupply[productSlug];
    require(supply != 0, "Product does not exist yet");

    uint256 price = getPrice(supply, 1);
    uint256 subjectFee = price * productFeePercent / 1 ether;
    require(msg.value >= price + subjectFee, "Insufficient payment");
    
    productKeys[productSlug][msg.sender] += 1;
    productKeysSupply[productSlug] = supply + 1;
    emit ProductKeyBought(
      productSlug,
      msg.sender,
      1,
      price + subjectFee,
      subjectFee
    );

    address safe = safes[productSlug];

    (bool success1, ) = safe.call{value: subjectFee}("");

    require(success1, "Funds transfer failed");
  }

  function sellKeys(string memory productSlug, uint256 amount) public payable {
    uint256 supply = productKeysSupply[productSlug];

    require(supply > amount, "Cannot sell last key");
    require(productKeys[productSlug][msg.sender] >= amount, "Insufficient keys");

    uint256 price = getPrice(supply - amount, amount);
    uint256 subjectFee = price * productFeePercent / 1 ether;

    productKeys[productSlug][msg.sender] -= amount;
    productKeysSupply[productSlug] = supply - amount;
    emit productKeysold(
      productSlug,
      msg.sender,
      amount,
      price - subjectFee,
      subjectFee
    );

    address safe = safes[productSlug];

    // transfer to the buyer
    (bool success1, ) = msg.sender.call{value: price - subjectFee}("");

    // transfer to the owner
    (bool success2, ) = safe.call{value: subjectFee}("");

    require(success1 && success2, "Funds transfer failed");
  }
}

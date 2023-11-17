const { ethers } = require("hardhat");
const ProductKeysArtifact = require("../artifacts/contracts/ProductKeys.sol/ProductKeys.json");

async function main() {
  const [deployer] = await ethers.getSigners();

  const address = "0x0846c393EBDA7214be271A3C2Ddc63B77ffDA7bd";
  const contract = new ethers.Contract(address, ProductKeysArtifact.abi, deployer);

  const createTx = await contract.connect(deployer).createProduct(deployer.address, "product-tech");
  await createTx.wait();

  let price = await contract.getBuyPriceAfterFee("product-tech", 1);
  const buy1 = await contract.connect(deployer).buyKey("product-tech", { value: price });
  let receipt = await buy1.wait();
  console.log("receipt", receipt.hash);

  price = await contract.getBuyPriceAfterFee("product-tech", 1);
  const buy2 = await contract.connect(deployer).buyKey("product-tech", { value: price });
  receipt = await buy2.wait();
  console.log("receipt", receipt.hash);

  price = await contract.getBuyPriceAfterFee("product-tech", 1);
  const buy3 = await contract.connect(deployer).buyKey("product-tech", { value: price });
  receipt = await buy3.wait();
  console.log("receipt", receipt.hash);
  
  const sell = await contract.connect(deployer).sellKeys("product-tech", 1);
  receipt = await sell.wait();
  console.log("receipt", receipt.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

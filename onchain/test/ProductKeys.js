const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Product Keys", function () {
  let creator;
  let buyer1;
  let buyer2;
  let safeAddress;

  let productKeysContract;

  let fee = ethers.parseUnits("0.05", "ether")
  console.log(fee);

  beforeEach(async () => {
    [creator, buyer1, buyer2, safeAddress] = await ethers.getSigners();
  });

  it("Deployment should work", async function () {
    const action = ethers.deployContract("ProductKeys", [fee]);

    await expect(action).not.to.be.reverted;
  });

  const builder = async () => {
    return ethers.deployContract("ProductKeys", [fee]);
  };

  describe("functions", () => {
    beforeEach(async () => {
      productKeysContract = await builder();
    });

    describe("createProduct", () => {
      it("should create a product", async () => {
        const action = productKeysContract.connect(creator).createProduct(safeAddress.address, "product-tech");

        await expect(action).not.to.be.reverted;
        const onchainName = await productKeysContract.owners(creator.address);
        expect(onchainName).to.equal("product-tech");
        const onchainSafeAddress = await productKeysContract.safes("product-tech");
        expect(onchainSafeAddress).to.equal(safeAddress.address);
      });
    });

    describe("buyKey", () => {
      it("should buy a key", async () => {
        await productKeysContract.connect(creator).createProduct(safeAddress.address, "product-tech");

        const price = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const action = productKeysContract.connect(buyer1).buyKey("product-tech", { value: price });

        await expect(action).not.to.be.reverted;
        const onchainKeySupply = await productKeysContract.productKeys("product-tech", buyer1.address);
        expect(onchainKeySupply).to.equal(1);
      });
    });

    describe("sellKeys", () => {
      it("should sell a key", async () => {
        await productKeysContract.connect(creator).createProduct(safeAddress.address, "product-tech");

        const firstPrice = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const firstPurchase = productKeysContract.connect(buyer1).buyKey("product-tech", { value: firstPrice });
        await expect(firstPurchase).not.to.be.reverted;

        const secondPrice = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const secondPurchase = productKeysContract.connect(buyer1).buyKey("product-tech", { value: secondPrice });
        await expect(secondPurchase).not.to.be.reverted;

        const onchainKeySupply = await productKeysContract.productKeys("product-tech", buyer1.address);
        expect(onchainKeySupply).to.equal(2);

        const sellAction = productKeysContract.connect(buyer1).sellKeys("product-tech", 1);
        await expect(sellAction).not.to.be.reverted;

        const onchainKeySupplyAfter = await productKeysContract.productKeys("product-tech", buyer1.address);
        expect(onchainKeySupplyAfter).to.equal(1);
      });
    });

    describe("money transfers", () => {
      it("should transfer some fee to the safe", async () => {
        await productKeysContract.connect(creator).createProduct(safeAddress.address, "product-tech");
        
        const balanceBefore = await ethers.provider.getBalance(safeAddress.address);

        const firstPrice = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const firstPurchase = productKeysContract.connect(buyer1).buyKey("product-tech", { value: firstPrice });
        await expect(firstPurchase).not.to.be.reverted;

        const secondPrice = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const secondPurchase = productKeysContract.connect(buyer1).buyKey("product-tech", { value: secondPrice });
        await expect(secondPurchase).not.to.be.reverted;

        const thirdPrice = await productKeysContract.getBuyPriceAfterFee("product-tech", 1);
        const thirdPurchase = productKeysContract.connect(buyer1).buyKey("product-tech", { value: thirdPrice });
        await expect(thirdPurchase).not.to.be.reverted;

        const balanceAfter = await ethers.provider.getBalance(safeAddress.address);

        expect(balanceAfter).to.be.greaterThan(balanceBefore);
      });
    });
  });
});

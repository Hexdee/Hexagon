const {
  time,
  loadFixture,
} = require("@nomicfoundation/hardhat-network-helpers");
const { anyValue } = require("@nomicfoundation/hardhat-chai-matchers/withArgs");
const { expect } = require("chai");

describe("Test", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployHexagon() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await ethers.getSigners();

    const Hexagon = await ethers.getContractFactory("Hexagon");
    const hexagon = await Hexagon.deploy();

    return { hexagon, owner, otherAccount };
  }

  describe("Manufacturer", function () {
    describe("Register Manufacturer", async function () {

      async function registerManufacturer(name) {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        await hexagon.register(name);
        return { hexagon, owner, otherAccount };
      }

      it("Should return manufacturer details if getManufacturer is called with a registered account as arg", async function () {
        const name = "hexdee";
        const { hexagon, owner } = await registerManufacturer(name);
        const manufacturer = await hexagon.getManufacturer(owner.address);
        await expect(manufacturer[1]).equals(name);
        await expect(manufacturer[2]).equals(owner.address);
      });

      it("Should increase total manufacturer", async function () {
        const { hexagon } = await registerManufacturer("hexdee");
        await expect(Number(await hexagon.totalManufacturers())).equals(1);
      });

    })

    describe("Create Product", async function () {
      it("Should only allow manufacturers create product", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        await hexagon.register("hexdee");
        await expect(hexagon.createProduct(name, url)).not.to.be.reverted;
        await expect(hexagon.connect(otherAccount).createProduct(name, url)).to.be.revertedWith("only manufacturers can call this function!");
      });

      it("Should increase totalProduct", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name, url);
        await expect(Number(await hexagon.totalProducts())).equals(1);
      });

      it("Should return product details if getProduct is called with product name", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name, url);
        const product = await hexagon.getProduct(name);
        await expect(product[1]).equals(name);
        await expect(product[2]).equals(url);
      });

      it("Should return product url if getInfo is called with product name", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name, url);
        const info = await hexagon.getInfo(name);
        await expect(info).equals(url);
      });

      it("Should revert if getProduct is called with invalid product name", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name, url);
        await expect(hexagon.getProduct(name)).not.to.be.reverted;
        await expect(hexagon.getProduct("invalid name")).to.be.reverted;
        await expect(hexagon.getProduct("invalid name")).to.be.reverted;
      });
    })


    describe("Others", async function () {
      it("Should allow only manufacturer update product", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        const new_url = "https://new_url";
        await hexagon.register("hexdee");
        await expect(hexagon.createProduct(name, url)).not.to.be.reverted;
        await expect(hexagon.updateProduct(name, new_url)).not.to.be.reverted;
        await expect(hexagon.connect(otherAccount).createProduct(name, url)).to.be.revertedWith("only manufacturers can call this function!");
        await expect(hexagon.connect(otherAccount).updateProduct(name, new_url)).to.be.revertedWith("only product manufacturers can call this function!");
      });
      it("Should return new url after updating product", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name = "name";
        const url = "https://url";
        const new_url = "https://new_url";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name, url)
        await hexagon.updateProduct(name, new_url)
        const product = await hexagon.getProduct(name);
        await expect(product[2]).equals(new_url);
        await expect(await hexagon.getInfo(name)).equals(new_url);
      });
      it("Should return all manufacturers products along with other info when getManufacturer is called", async function () {
        const { hexagon, owner, otherAccount } = await loadFixture(deployHexagon);
        const name1 = "name1";
        const url1 = "https://url1";
        const name2 = "name2"
        const url2 = "https://url2";
        await hexagon.register("hexdee");
        await hexagon.createProduct(name1, url1)
        await hexagon.createProduct(name2, url2)
        const manufacturer = await hexagon.getManufacturer(owner.address);
        await expect(manufacturer[3]).to.have.deep.members([name1, name2]) //equal([name1, name2]);
      });
    })
  })
});

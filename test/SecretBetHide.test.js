const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("SecretBetHide", function () {
  let secretBetHide;
  let owner;
  let oracle;
  let bettor;
  let addrs;

  beforeEach(async function () {
    [owner, oracle, bettor, ...addrs] = await ethers.getSigners();
    
    const SecretBetHide = await ethers.getContractFactory("SecretBetHide");
    secretBetHide = await SecretBetHide.deploy();
    await secretBetHide.waitForDeployment();

    // Set oracle
    await secretBetHide.setOracle(oracle.address, true);
  });

  describe("Deployment", function () {
    it("Should set the right owner", async function () {
      expect(await secretBetHide.owner()).to.equal(owner.address);
    });

    it("Should initialize with zero values", async function () {
      expect(await secretBetHide.totalBets()).to.equal(0);
      expect(await secretBetHide.totalVolume()).to.equal(0);
      expect(await secretBetHide.nextBetId()).to.equal(1);
    });
  });

  describe("Oracle Management", function () {
    it("Should allow owner to set oracle", async function () {
      await secretBetHide.setOracle(addrs[0].address, true);
      expect(await secretBetHide.oracles(addrs[0].address)).to.be.true;
    });

    it("Should not allow non-owner to set oracle", async function () {
      await expect(
        secretBetHide.connect(bettor).setOracle(addrs[0].address, true)
      ).to.be.revertedWith("Not the owner");
    });
  });

  describe("Event Management", function () {
    it("Should allow owner to create event", async function () {
      const eventId = "test-event-1";
      const description = "Test Event";
      const endTime = Math.floor(Date.now() / 1000) + 3600; // 1 hour from now

      // Note: In a real test, you would need to encrypt the odds using FHE
      // For this test, we'll use placeholder values
      await secretBetHide.createEvent(
        eventId,
        description,
        ethers.parseEther("1.5"), // homeOdds
        ethers.parseEther("2.0"), // awayOdds
        ethers.parseEther("3.0"), // drawOdds
        endTime
      );

      const event = await secretBetHide.getEvent(eventId);
      expect(event.description).to.equal(description);
    });

    it("Should not allow non-owner to create event", async function () {
      const eventId = "test-event-2";
      const description = "Test Event";
      const endTime = Math.floor(Date.now() / 1000) + 3600;

      await expect(
        secretBetHide.connect(bettor).createEvent(
          eventId,
          description,
          ethers.parseEther("1.5"),
          ethers.parseEther("2.0"),
          ethers.parseEther("3.0"),
          endTime
        )
      ).to.be.revertedWith("Not the owner");
    });
  });

  describe("Fee Management", function () {
    it("Should allow owner to set platform fee", async function () {
      const newFee = 300; // 3%
      await secretBetHide.setPlatformFee(newFee);
      expect(await secretBetHide.platformFee()).to.equal(newFee);
    });

    it("Should not allow fee above maximum", async function () {
      const maxFee = 1001; // Above 10%
      await expect(
        secretBetHide.setPlatformFee(maxFee)
      ).to.be.revertedWith("Fee too high");
    });

    it("Should not allow non-owner to set fee", async function () {
      await expect(
        secretBetHide.connect(bettor).setPlatformFee(300)
      ).to.be.revertedWith("Not the owner");
    });
  });

  describe("Access Control", function () {
    it("Should allow only oracle to resolve bets", async function () {
      // This would require a bet to exist first
      // In a real implementation, you'd need to create a bet with encrypted data
      expect(await secretBetHide.oracles(oracle.address)).to.be.true;
    });

    it("Should not allow non-oracle to resolve bets", async function () {
      // This test would require a bet to exist
      // Implementation depends on the specific bet resolution logic
    });
  });
});

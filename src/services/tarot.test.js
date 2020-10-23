import { fetchCardData, fetchSpreads } from "../services/firebase";

import Tarot from "./Tarot";
import factory from "../util/test/fixtures/factory";

jest.mock("../services/firebase");

fetchSpreads.mockReturnValue(factory.generate("spread", 1));
fetchCardData.mockReturnValue(factory.generate("card", 10));

const spreads = describe("Tarot", () => {
  describe("constructor", () => {
    it("constructs", () => {
      const tarot = new Tarot();
      expect(tarot).toBeInstanceOf(Tarot);
    });
    it("initializes deck member to an array of consecutive integers 0 - 77", () => {
      const tarot = new Tarot();
      const randomIndex = Math.floor(Math.random() * Math.floor(77));
      expect(tarot.deck).toHaveLength(78);
      expect(tarot.deck[randomIndex]).toEqual(randomIndex);
    });
    it("initializes a spreads member to an empty array", () => {
      const tarot = new Tarot();
      expect(tarot.spreads).toHaveLength(0);
    });
    it("initializes a readings member to an empty array", () => {
      const tarot = new Tarot();
      expect(tarot.readings).toHaveLength(0);
    });
    it("has a method named getSpreads", () => {
      const tarot = new Tarot();
      expect(tarot.getSpreads).toBeInstanceOf(Function);
    });
    it("has a method named shuffle", () => {
      const tarot = new Tarot();
      expect(tarot.shuffle).toBeInstanceOf(Function);
    });
    it("has a method named cut", () => {
      const tarot = new Tarot();
      expect(tarot.cut).toBeInstanceOf(Function);
    });
    it("has a method named deal", () => {
      const tarot = new Tarot();
      expect(tarot.deal).toBeInstanceOf(Function);
    });
  });
  describe("getSpreads", () => {
    it("adds a spread object to the spreads member array", async () => {
      const tarot = new Tarot();
      await tarot.getSpreads();
      expect(tarot.spreads).toHaveLength(1);
    });
  });
  describe("shuffle", () => {
    const tarot = new Tarot();
    it("randomizes the order of the deck", () => {
      const tarot = new Tarot();
      const randomIndex = Math.floor(Math.random() * Math.floor(77));
      const preShuffleRandomIndex = tarot.deck[randomIndex];
      tarot.shuffle();
      const postShuffle = tarot.deck[randomIndex];
      expect(postShuffle).not.toEqual(preShuffleRandomIndex);
    });
  });
  describe("cut", () => {
    it("splits the deck at an index and moves it to the start of the array", () => {
      const tarot = new Tarot();
      const randomIndex = Math.floor(Math.random() * Math.floor(77));
      const preCutStart = tarot.deck[0];
      tarot.cut(randomIndex);
      const postCutStart = tarot.deck[0];
      const postCutIndex = tarot.deck[tarot.deck.length - randomIndex];
      expect(postCutStart).toEqual(randomIndex);
      expect(postCutIndex).toEqual(preCutStart);
    });
  });
  describe("deal", () => {
    it("returns an array of cards from api matching the index of the spread", async () => {
      const tarot = new Tarot();
      await tarot.getSpreads();
      const cards = await tarot.deal(tarot.spreads[0].positions.length);
      expect(cards).toHaveLength(10);
    });
  });
  describe("read", () => {
    const doBefore = async () => {
      const tarot = new Tarot();
      await tarot.getSpreads();
      const cards = await tarot.deal(tarot.spreads[0].positions.length);
      tarot.read(tarot.spreads[0], cards);
      return tarot;
    };

    it("adds a reading to the readings array", async () => {
      const tarot = await doBefore();
      expect(tarot.readings).toHaveLength(1);
      const beforeReadLength = tarot.readings.length;
      tarot.read(tarot.spreads[0], factory.generate("card", 10));
      expect(tarot.readings).toHaveLength(beforeReadLength + 1);
    });
    it("creates a reading object for each index in the spread array", async () => {
      const tarot = await doBefore();
      const reading = tarot.readings[0];
      expect(reading).toHaveLength(tarot.spreads[0].positions.length);
    });
    describe("reading object", () => {
      it("has a positionName", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("positionName");
      });
      it("has a displayName ", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("displayName");
      });
      it("has a positionDescription", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("positionDescription");
      });
      it("has a cardName", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("cardName");
      });
      it("has a cardNumber", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("cardNumber");
      });
      it("has a hex color", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("hex");
      });
      it("has an image", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("image");
      });
      it("has a positionReading", async () => {
        const tarot = await doBefore();
        const reading = tarot.readings[0];
        expect(reading[0]).toHaveProperty("positionReading");
      });
    });
    /* future iterations to include relationships to other cards in the spread, different decks/card meanings & images */
  });
});

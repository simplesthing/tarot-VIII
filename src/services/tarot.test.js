import Tarot from "./Tarot";
import factory from "../util/test/fixtures/factory";
import { fetchSpreads } from "../services/firebase";

jest.mock("../services/firebase");

fetchSpreads.mockReturnValue(factory.generate("spread", 2));

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
      expect(tarot.spreads).toHaveLength(2);
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
    it("returns an array of the first 10 indexes from the deck", () => {
      const tarot = new Tarot();
      const spread = tarot.deal();
      const randomIndex = Math.floor(Math.random() * Math.floor(9));
      expect(spread).toHaveLength(10);
      expect(spread[randomIndex]).toEqual(tarot.deck[randomIndex]);
    });
    it("does not change the deck array", () => {
      const tarot = new Tarot();
      const deckDeepCopy = [...tarot.deck];
      const randomIndex = Math.floor(Math.random() * Math.floor(9));
      const spread = tarot.deal();
      expect(tarot.deck).toHaveLength(78);
      expect(deckDeepCopy[randomIndex]).toEqual(tarot.deck[randomIndex]);
    });
  });
  describe("read", () => {
    it("adds a reading to the readings array", () => {});
    it("creates a reading object for each position in the array", () => {});
    describe("reading object", () => {
      it("has a name", () => {});
      it("has a displayName ", () => {});
      it("has a description", () => {});
      it("has a cardName", () => {});
      it("has a number", () => {});
      it("has a hex color", () => {});
      it("has an image", () => {});
      it("has a meaning", () => {});
    });
  });
});

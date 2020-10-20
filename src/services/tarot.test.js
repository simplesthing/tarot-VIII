import Tarot from "./Tarot";

describe("Tarot", () => {
  describe("constructor", () => {
    it("constructs", () => {
      const tarot = new Tarot();
      expect(tarot).toBeInstanceOf(Tarot);
    });
    it("initializes deck member to an array of consecutive integers 0 - 77", () => {
      const tarot = new Tarot();
      expect(tarot.deck).toHaveLength(78);
      const randomIndex = Math.floor(Math.random() * Math.floor(77));
      expect(tarot.deck[randomIndex]).toEqual(randomIndex);
    });
    it("has a method named shuffle", () => {
      const tarot = new Tarot();
      expect(tarot.shuffle).toBeInstanceOf(Function);
    });
    it("has a method named cut", () => {
      const tarot = new Tarot();
      expect(tarot.cut).toBeInstanceOf(Function);
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
});

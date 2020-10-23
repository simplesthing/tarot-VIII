import { fetchSpreads, getCardData } from "../services/firebase";

class Tarot {
  constructor() {
    this.deck = Array.from(Array(78).keys());
    this.spreads = [];
    this.readings = [];
  }
  async getSpreads() {
    try {
      const spreads = await fetchSpreads();
      this.spreads = spreads;
    } catch (e) {
      console.log(`Error getting spreads ${JSON.stringify(e)}`);
    }
  }
  shuffle() {
    let deck = this.deck;
    let counter = this.deck.length;
    let temp;
    let index;
    while (counter > 0) {
      index = Math.floor(Math.random() * counter);
      counter--;
      temp = deck[counter];
      deck[counter] = deck[index];
      deck[index] = temp;
    }
    return;
  }
  cut(index) {
    let deck = this.deck;
    const move = deck.splice(index);
    this.deck = move.concat(deck);
    return;
  }
  deal(spreadType) {
    const spreadCount = 10;
    let spread = [...this.deck];
    spread.splice(spreadCount);
    return spread;
  }
  read(spread, cards) {}
}

export default Tarot;

import { fetchCardData, fetchSpreads } from "../services/firebase";

class Tarot {
  constructor() {
    this.deck = Array.from(Array(78).keys());
    this.spreads = [];
    this.readings = [];
  }
  getDeck() {
    this.deck = Array.from(Array(78).keys());
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
  async deal(numberOfCards) {
    let _deck = [...this.deck];
    _deck.splice(numberOfCards);
    const cards = await fetchCardData(_deck);
    return cards;
  }
  read(spread, cards) {
    let reading = spread.positions.map((pos, index) => {
      return {
        positionName: pos.name,
        displayName: pos.displayName,
        positionDescription: pos.description,
        cardName: cards[index].name,
        cardNumber: cards[index].number,
        hex: cards[index].hex,
        image: cards[index].image,
        positionReading: cards[index][pos.name],
      };
    });
    this.readings.push(reading);
  }
}

export default Tarot;

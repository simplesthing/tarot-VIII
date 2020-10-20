class Tarot {
  constructor() {
    this.deck = Array.from(Array(78).keys());
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
  }
}

export default Tarot;

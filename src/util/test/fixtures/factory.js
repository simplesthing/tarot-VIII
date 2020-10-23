const factory = require("fixture-factory");
const faker = require("faker");

//SPREADS
const randomSpreadCount = Math.floor(Math.random() * Math.floor(10));

const spreadPositionModel = {
  name: {
    method: "lorem.word",
  },
  displayName: {
    method: "name.findName",
  },
  description: {
    method: "lorem.paragraph",
  },
};

factory.register("spreadPosition", spreadPositionModel);

const spreadDataModel = {
  name: {
    method: "lorem.word",
  },
  displayName: {
    method: "name.findName",
  },
  positions: () => factory.generate("spreadPosition", randomSpreadCount),
};

factory.register("spread", spreadDataModel);

//CARDS

const randomIndex = Math.floor(Math.random() * Math.floor(77));
const cardTypes = [
  "elemental",
  "planetary",
  "zodiacal",
  "wands",
  "cups",
  "swords",
  "coins",
];
const cardElements = ["fire", "air", "water", "earth"];

const cardModel = {
  index: randomIndex,
  arcana: () => {
    return randomIndex % 5 === 0 ? "major" : "minor";
  },
  number: randomIndex.toString(),
  type: cardTypes[Math.floor(Math.random() * Math.floor(6))],
  element: cardElements[Math.floor(Math.random() * Math.floor(4))],
  name: { method: "lorem.word" },
  color: { method: "commerce.color" },
  hex: { method: "internet.color" },
  image: { method: "image.imageUrl" },
  represents: { method: "lorem.sentence" },
  crosses: { method: "lorem.sentence" },
  crowns: { method: "lorem.sentence" },
  beneath: { method: "lorem.sentence" },
  behind: { method: "lorem.sentence" },
  before: { method: "lorem.sentence" },
  self: { method: "lorem.sentence" },
  influences: { method: "lorem.sentence" },
  hope: { method: "lorem.sentence" },
  outcome: { method: "lorem.sentence" },
};

factory.register("card", cardModel);

module.exports = factory;

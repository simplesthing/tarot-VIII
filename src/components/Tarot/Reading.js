import React, { useEffect, useState } from "react";

import Tarot from "../../services/Tarot";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  background: red;
`;

const ReadingInfo = styled.section`
  display: flex;
  flex-direction: column;
`;

const Property = styled.span`
  margin-left: 15px;
`;

const Spread = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 1em;
`;

const tarot = new Tarot();

const Reading = () => {
  const [spreads, setSpreads] = useState([]);
  const [cards, setCards] = useState([]);
  const [thisSpread, setThisSpread] = useState({});
  const [reading, setReading] = useState([]);
  const [shuffleCount, setShuffleCount] = useState(0);
  const [cutCount, setCutCount] = useState(0);

  useEffect(() => {
    const init = async () => {
      const spreads = await tarot.getSpreads();
      setSpreads(tarot.spreads);
      setThisSpread(tarot.spreads[0]);
    };
    init();
  }, []);

  const shuffle = () => {
    tarot.shuffle();
    setShuffleCount(shuffleCount + 1);
  };

  const cut = () => {
    tarot.cut();
    setCutCount(cutCount + 1);
  };

  const deal = async () => {
    const cards = await tarot.deal(thisSpread.positions.length);
    console.log("cards " + JSON.stringify(cards));
    setCards(cards);
  };

  const read = () => {
    const readingIndex =
      tarot.readings.length === 0 ? 0 : tarot.readings.length + 1;
    tarot.read(thisSpread, cards);
    setReading(tarot.readings[readingIndex]);
  };

  return (
    <Container>
      <ReadingInfo>
        <h2>spreads</h2>
        {spreads.map((spread) => {
          return <span key={spread.name}>{spread.name}</span>;
        })}
        <h3>This spread</h3> <span>{thisSpread.name}</span>
      </ReadingInfo>
      <Spread>
        {shuffleCount < 3 && cutCount === shuffleCount && (
          <button onClick={shuffle}>Shuffle</button>
        )}
        {cutCount < 3 && cutCount !== shuffleCount && (
          <button onClick={cut}>Cut</button>
        )}
        {cutCount === 3 && <button onClick={deal}>DEAL</button>}
        {/* {cards.map((spread) => {
          return <span key={spread.name}>{spread.name}</span>;
        })}
        {cards.length > 0 && <button onClick={read}>READ</button>}
        {reading.map((pos) => {
          return (
            <Container
              key={pos.cardName}
              style={{ border: `solid 10px ${pos.hex}` }}
            >
              <h4>{pos.displayName}</h4>
              <Property>Card: {pos.cardName}</Property>
              <Property>{pos.positionReading}</Property>
            </Container>
          );
        })} */}
      </Spread>
    </Container>
  );
};

export default Reading;

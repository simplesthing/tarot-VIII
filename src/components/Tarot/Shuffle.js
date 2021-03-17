import React, { useEffect, useState } from "react";

import Tarot from "../../services/Tarot";
import styled from "styled-components";

const Instructions = styled.h1`
  position: relative;
  height: 60px;
  z-index: 10;
  line-height: 4em;
  font-size: 1em;
  font-family: Verdana, Geneva, sans-serif;
  font-weight: 100;
  margin: 5vmin;
  float: left;
`;

const Arrow = styled.span`
  width: 100%;
  height: 100%;
  display: block;
  background: url(/images/arrows/1.png) calc(57% + 41px) center no-repeat;
  float: right;
  margin-right: -55px;
  margin-top: -60px;
`;

const Shuffle = () => {
  return (
    <div>
      <main className="start">
        <Instructions className="instructions">
          Click tarot card to start
          <Arrow aria-label="arrow pointing at deck button"></Arrow>
        </Instructions>

        <picture class="deck">
          <source
            type="image/webp"
            srcset="images/tarot/smith-waite-tarot.webp"
          />
          <img
            src="images/tarot/smith-waite-tarot.jpg"
            alt="Card, click to start"
          />
        </picture>
      </main>
      <footer>
        <div class="tag">
          <i class="icon tetractys"></i>
          <h1>TAROTJS</h1>
          <p>Lorem ipsum sonat</p>
          <i class="icon tree-of-life"></i>
        </div>
      </footer>
    </div>
  );
};

export default Shuffle;

import ProfilePage from "./ProfilePage";
import React from "react";
import Reading from "./Tarot/Reading";
import Tarot from "./Tarot/Tarot";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Hero = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: stretch;
`;

const Profile = styled(ProfilePage)`
  flex-basis: 200px;
`;

const HomePage = () => {
  return (
    <Container>
      <Hero>
        <Profile />
        <Reading />
      </Hero>
      <Tarot />
    </Container>
  );
};

export default HomePage;

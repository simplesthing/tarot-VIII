import ProfilePage from "./ProfilePage";
import React from "react";
import Reading from "./Tarot/Reading";
import styled from "styled-components";

const Container = styled.main`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: flex-start;
`;

const Profile = styled(ProfilePage)`
  flex-basis: 200px;
`;

const HomePage = () => {
  return (
    <Container>
      <Profile />
      <Reading />
    </Container>
  );
};

export default HomePage;

import React, { useContext } from "react";

import { UserContext } from "../contexts/UserProvider";
import { auth } from "../services/firebase";
import styled from "styled-components";

const Article = styled.article`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  background: yellow;
`;

const Section = styled.section`
  margin-bottom: 1em;
`;

const ProfilePage = () => {
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;

  return (
    <Article role="contentinfo" aria-label="Session info and logout">
      <figure>
        <div
          style={{
            background: `url(${
              photoURL || "https://loremflickr.com/320/240/tarot"
            })  no-repeat center center`,
            backgroundSize: "cover",
            height: "200px",
            width: "200px",
            borderRadius: "100px",
          }}
        ></div>
        <figcaption className="visually-hidden">
          Random image with a depiction of, or reference to, the Tarot.
        </figcaption>
      </figure>
      <Section role="contentinfo" aria-label="Profile information">
        <h2>{displayName}</h2>
        <address>{email}</address>
      </Section>
      <Section>
        <button name="sign out" type="button" onClick={() => auth.signOut()}>
          Sign out
        </button>
      </Section>
    </Article>
  );
};
export default ProfilePage;

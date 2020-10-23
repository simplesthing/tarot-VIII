import React, { useContext } from "react";

import Reading from "./Tarot/Reading";
import { UserContext } from "../contexts/UserProvider";
import { auth } from "../services/firebase";

const ProfilePage = () => {
  const user = useContext(UserContext);

  const { photoURL, displayName, email } = user;

  return (
    <div>
      <div>
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
        <div>
          <h2>{displayName}</h2>
          <h3>{email}</h3>
        </div>
      </div>
      <button onClick={() => auth.signOut()}>Sign out</button>
      <Reading />
    </div>
  );
};
export default ProfilePage;

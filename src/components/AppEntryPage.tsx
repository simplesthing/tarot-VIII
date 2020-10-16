import React, { useContext } from "react";

import PasswordReset from "./PasswordResetPage";
import ProfilePage from "./ProfilePage";
import { Router } from "@reach/router";
import SignIn from "./SignInPage";
import SignUp from "./SignUpPage";
import { UserContext } from "../contexts/UserProvider";

function AppEntry() {
  const user = useContext(UserContext);
  return user ? (
    <ProfilePage />
  ) : (
    <Router>
      <SignUp path="signUp" />
      <SignIn path="/" />
      <PasswordReset path="passwordReset" />
    </Router>
  );
}

export default AppEntry;

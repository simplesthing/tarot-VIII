/*global event */

import { Link, RouteComponentProps } from "@reach/router";
import React, { useState } from "react";
import {
  auth,
  generateUserDocument,
  signInWithGoogle,
} from "../services/firebase";

const SignUpPage = (props: RouteComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [error, setError] = useState(null);

  const createUserWithEmailAndPasswordHandler = async (
    event,
    email,
    password
  ) => {
    event.preventDefault();
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { displayName });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
    setDisplayName("");
  };

  const onChangeHandler = (event) => {
    const { name, value } = event.currentTarget;

    if (event.currentTarget.name === "userEmail") {
      setEmail(value);
    } else if (event.currentTarget.name === "userPassword") {
      setPassword(value);
    } else if (event.currentTarget.name === "displayName") {
      setDisplayName(value);
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form>
          <label htmlFor="displayName" className="block">
            Display Name:
          </label>
          <input
            type="text"
            name="displayName"
            value={displayName}
            placeholder="E.g: Faruq"
            id="displayName"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userEmail">Email:</label>
          <input
            type="email"
            name="userEmail"
            value={email}
            placeholder="E.g: simplesthing@gmail.com"
            id="userEmail"
            onChange={(event) => onChangeHandler(event)}
          />
          <label htmlFor="userPassword">Password:</label>
          <input
            type="password"
            name="userPassword"
            value={password}
            placeholder="Your Password"
            id="userPassword"
            onChange={(event) => onChangeHandler(event)}
          />
          <button
            onClick={(event) => {
              createUserWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign up
          </button>
        </form>
        <p>or</p>
        <button
          onClick={() => {
            signInWithGoogle();
          }}
        >
          Sign In with Google
        </button>
        <p>
          Already have an account? <Link to="/">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};
export default SignUpPage;

/*global event */

import React, { useState } from "react";
import {
  auth,
  generateUserDocument,
  signInWithGoogle,
} from "../services/firebase";

import { Link } from "@reach/router";
import { RouteComponentProps } from "@reach/router";
import { traverseObjects } from "firestore-export-import/dist/helper";
import { v4 as uuidv4 } from "uuid";

const SignInPage = (props: RouteComponentProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const signInWithEmailAndPasswordHandler = (event, email, password) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password).catch((error) => {
      setError("Error signing in with password and email!");
      console.error("Error signing in with password and email", error);
    });
  };

  const signInAnonymously = async (event) => {
    const userId = uuidv4();
    const displayName = userId.slice(9, 13);
    const email = `${displayName}@anon.com`;
    const regex = /-/g;
    const password = userId.replace(regex, "!");
    try {
      const { user } = await auth.createUserWithEmailAndPassword(
        email,
        password
      );
      generateUserDocument(user, { user });
    } catch (error) {
      setError("Error Signing up with email and password");
    }

    setEmail("");
    setPassword("");
  };

  const onChangeHandler = (event) => {
    const name = event.currentTarget.name;
    const value = event.currentTarget.value;
    if (name === "userEmail") {
      setEmail(value);
    } else if (name === "userPassword") {
      setPassword(value);
    }
  };

  return (
    <div>
      <h1>Sign In</h1>
      <div>
        {error !== null && <div>{error}</div>}
        <form aria-label="Sign in form">
          <label htmlFor="userEmail" className="block">
            Email:
          </label>
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
              signInWithEmailAndPasswordHandler(event, email, password);
            }}
          >
            Sign in
          </button>
        </form>
        <p>or</p>
        <button
          onClick={(event) => {
            signInWithGoogle();
          }}
        >
          Sign in with Google
        </button>
        <button
          onClick={(event) => {
            signInAnonymously(event);
          }}
        >
          Sign in Anonymously
        </button>
        <p>
          Don't have an account? <Link to="signUp">Sign up here</Link> <br />{" "}
          <Link to="passwordReset">Forgot Password?</Link>
        </p>
      </div>
    </div>
  );
};

export default SignInPage;

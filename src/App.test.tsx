import { render, screen } from "@testing-library/react";

import App from "./App";
import React from "react";

describe("App", () => {
  it("should have a sign in page header", () => {
    render(<App />);
    const pageHead = screen.getByRole("heading", { name: /Sign In/i });
    expect(pageHead).toBeInTheDocument();
  });
  it("should have a sign in form", () => {
    render(<App />);
    const SignInForm = screen.getByRole("form", { name: "Sign in form" });
    const email = screen.getByRole("textbox", { name: "Email:" });
    const password = screen.getByLabelText("Password:");
    const signInButton = screen.getByRole("button", { name: "Sign in" });

    expect(SignInForm).toBeInTheDocument();
    expect(SignInForm).toContainElement(email);
    expect(SignInForm).toContainElement(password);
    expect(SignInForm).toContainElement(signInButton);
  });
  it("should show sign in with Google button", () => {
    render(<App />);
    const signInGoogleButton = screen.getByRole("button", {
      name: "Sign in with Google",
    });
    expect(signInGoogleButton).toBeInTheDocument();
  });
  it("should show anonymous sign in button", () => {
    render(<App />);
    const signInAnonButton = screen.getByRole("button", {
      name: "Sign in Anonymously",
    });
    expect(signInAnonButton).toBeInTheDocument();
  });
  it("should show a sign up link", () => {
    render(<App />);
    const signUpLink = screen.getByRole("link", { name: "Sign up here" });
    expect(signUpLink).toBeInTheDocument();
  });
  it("should show a forgot password link", () => {
    render(<App />);
    const forgotPasswordLink = screen.getByRole("link", {
      name: "Forgot Password?",
    });
    expect(forgotPasswordLink).toBeInTheDocument();
  });
});

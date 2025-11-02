import React from "react";
import { Form, Link, Navigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import Controls from "../ui/Controls";
import Title from "../ui/Title";
import "../styles/Auth.css";

export default function Signup() {
  const usernameRegex = /^[a-zA-Z0-9_\-]+$/;

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value.trim();
    const email = form.email.value.trim();
    const password = form.password.value;
    const confirmPassword = form["confirm-password"].value;
    const agreement = form.agreement.checked;

    if (!username || !email || !password || !confirmPassword) {
      toast.error("Please fill out all fields.");
      return;
    }

    if (username.length < 5 || username.length > 15) {
      toast.error("Username must be between 5 and 15 characters.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (!agreement) {
      toast.error("You must agree to the Terms and Privacy Policy.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });
      const data = await response.json();
      if (data.success) {
        toast.success(data.message);
        <Navigate to="/home" replace />
      }
      else toast.error(data.error);
    } catch (error) {
      console.log("Signup failed: ", error);
    }
  };

  return (
    <div className="container">
      <Title />
      <Form
        className="form border"
        method="post"
        noValidate
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Choose a unique username"
            required
            minLength={5}
            maxLength={15}
            pattern={usernameRegex.source}
          />
        </label>
        <label htmlFor="email">
          Email Address
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email address"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Create a strong password"
            required
            minLength={8}
          />
        </label>
        <label htmlFor="confirm-password">
          Confirm Password
          <input
            type="password"
            id="confirm-password"
            placeholder="Confirm your password"
            required
            minLength={8}
          />
        </label>
        <label htmlFor="agreement">
          <input type="checkbox" id="agreement" name="agreement" />I agree to
          the
          <span>
            <Link to="" className="link">Terms of Services</Link>
          </span>
          and
          <span>
            <Link to="" className="link">Privacy Policy</Link>
          </span>
        </label>
        <button type="submit" className="submit-btn">
          Create Account
        </button>
        <p>
          Already have an account?{" "}
          <span>
            <Link className="link" to="/login">
              Login here
            </Link>
          </span>
        </p>
      </Form>
      <Controls />
    </div>
  );
}

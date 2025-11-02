import React, { FormEvent, SyntheticEvent } from "react";
import { Form, Link, useNavigate } from "react-router-dom";
import "../styles/Auth.css";
import Controls from "../ui/Controls";
import Title from "../ui/Title";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    const form = e.target;
    const username = form.username.value.trim();
    const password = form.password.value;

    if (!username || !password) {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (data.success) {
        console.log(data);
        if (data.data.requiresTwoFactor) {
          toast.success(data.message);
          navigate("/two-factor");
        } else {
          toast.success("Login successful");
          navigate("/home");
        }
      } else {
        toast.error(data.error);
      }
    } catch (error) {
      toast.error(`Login failed: ${error}`);
    }
  };

  return (
    <div className="container">
      <Title />
      <Form className="form border" method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            required
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Enter your password"
            required
          />
        </label>
        <div className="wrapper">
          <label htmlFor="rememberMe">
            <input type="checkbox" id="rememberMe" name="rememberMe" />
            Remember me
          </label>
          <Link to="" className="link forgot-password">Forgot password?</Link>
        </div>
        <button type="submit" className="submit-btn">
          Login
        </button>
        <p>
          Don't have an account?{" "}
          <span>
            <Link className="link" to="/signup">
              Sign up here
            </Link>
          </span>
        </p>
      </Form>
      <Controls />
    </div>
  );
}

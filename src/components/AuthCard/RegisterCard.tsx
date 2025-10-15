import "./AuthCard.css";

import React, { useState } from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { postRequest } from "../../utils/apiRequests";
import bcrypt from "bcryptjs";

export default function RegisterCard() {

  const { navLogin } = useAppNavigation();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const saltRounds = 10;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) return alert("Passwords do not match");

    const hashPass = await bcrypt.hash(password, saltRounds);

    const payload = {
      email: email,
      name: name,
      username: username,
      password: hashPass,
    };

    try {
      await postRequest("/users", payload)
      console.log("Account Created");
      navLogin();
    } catch (error) {
      console.error("Account creation failed: ", error);
      alert("Account creation failed:  " + error);
    }
  };

  return (
    <div className="auth-card">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          name="name"
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          name="email"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <input
          name="confirm-password"
          type="password"
          placeholder="Confirm Password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
        <button type="submit">Create Account</button>
      </form>
      <div className="auth-switch">
        <p>Already have an account?</p>
        <a className="text-link" onClick={navLogin}>Sign In</a>
      </div>
    </div>
  );
};

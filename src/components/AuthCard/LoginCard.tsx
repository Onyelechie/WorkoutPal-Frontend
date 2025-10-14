import "./AuthCard.css";

import React, { useState } from "react";
import { postRequest } from "../../utils/apiRequests";
import { useAppNavigation } from "../../hooks/useAppNavigation";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navProfile, navRegister } = useAppNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    try {
      await postRequest("/login", payload);
      navProfile();
    } catch (error) {
      console.error("Login failed:", error);
      alert(
            "Login failed. Please check your credentials and try again. " +
              error
          );
    }
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="auth-switch">
        <p>Don't have an account? </p>
        <a className="text-link" onClick={navRegister}>Create Account</a>
      </div>
    </div>
  );
}

export default LoginCard;

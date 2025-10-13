import "./AuthCard.css";

import React, { useState } from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";

export default function RegisterCard() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { navLogin } = useAppNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // handle the register logic here
    alert(`Username: ${username}\nEmail: ${email}\nPassword: ${password}`);
  };

  return (
    <div className="auth-card">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
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
        <button type="submit">Create Account</button>
      </form>
      <div className="auth-switch">
        <p>Already have an account?</p>
        <a className="text-link" onClick={navLogin}>Sign In</a>
      </div>
    </div>
  );
};

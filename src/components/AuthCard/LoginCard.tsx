import "./AuthCard.css";

import React, { useState } from "react";
import { useAppNavigation } from "../../hooks/useAppNavigation";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { navRegister } = useAppNavigation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Email: ${email}\nPassword: ${password}`);
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

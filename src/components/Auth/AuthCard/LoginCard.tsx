import "./AuthCard.css";

import React, { useState } from "react";
import { postRequest } from "../../../utils/apiRequests";
import { useAppNavigation } from "../../../hooks/useAppNavigation";
import { useErrorHandler } from "../../../hooks/useErrorHandler";
import { USER_LOGIN_FAIL } from "../../../app/constants/genericErrors";
import { useAchievement } from "../../../hooks/useAchievement";

function LoginCard() {
  const { alertOnRequestError } = useErrorHandler();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navHome, navRegister } = useAppNavigation();
  const achievement = useAchievement()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    postRequest("/login", payload)
      .then(async (response) => {
        if (response.status == 200) {
          console.log("Login successful");
          achievement.unlockAchievement(1);
          navHome();
        }
      })
      .catch((error) => {
        alertOnRequestError(USER_LOGIN_FAIL, error, error.response?.data?.detail);
      });
  };

  return (
    <div className="auth-card">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
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
        <button type="submit">Login</button>
      </form>
      <div className="auth-switch">
        <p>Don't have an account? </p>
        <a className="text-link" onClick={navRegister}>
          Create Account
        </a>
      </div>
    </div>
  );
}

export default LoginCard;

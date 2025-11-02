import "./AuthCard.css";

import React, { useState } from "react";
import { getRequest, postRequest } from "../../utils/apiRequests";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useAlertDialog } from "../../hooks/useAlertDialog";
import { defaultAchievements, type AchievementTemplate } from "../../types/achievementTemplate";
import { newUser } from "./CheckNewUser";
import { postNewAchievement } from "../../services/achievementService";
import { createAchievement } from "./UnlockLoginAchievement";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navHome, navRegister } = useAppNavigation();
  const dialogContext = useAlertDialog(); // access showAlert through context


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
          if (await newUser()) {
            const achievement = createAchievement();
            achievement.userId = 6;
            if (await postNewAchievement(achievement)) {
              dialogContext.showAlert(`Achievement Unlocked: ${achievement.badgeIcon} ${achievement.title}`, achievement.description);
            }
          }
        } //
        navHome();
      }
      )
      .catch((error) => {
        if (error?.response) {
          console.error("Login failed:", error);
          dialogContext.showAlert("Login failed", "Please check your credentials and try again. " +
            error.response.data
          );
        }
        else {
          dialogContext.showAlert("Server Error", "Unable to communicate with our server. Please try again later.")
        }
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

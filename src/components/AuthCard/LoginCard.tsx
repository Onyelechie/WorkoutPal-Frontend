import "./AuthCard.css";

import React, { useState } from "react";
import { postRequest } from "../../utils/apiRequests";
import { useAppNavigation } from "../../hooks/useAppNavigation";
import { useAlertDialog } from "../../hooks/useAlertDialog";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { navHome, navRegister } = useAppNavigation();
  const dialogContext = useAlertDialog(); // access showAlert through context

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = { email, password };

    try {
      const response = await postRequest("/login", payload);

      if (response.status === 200) {
        console.log("Login successful");
        navHome();
      }
    } catch (error: any) {
      if (error?.response) {
        console.error("Login failed:", error);
        dialogContext.showAlert(
          "Login failed",
          "Please check your credentials and try again. " + error.response.data
        );
      } else {
        // Now you can safely use await
        const result = await dialogContext.showConfirm(
          "Server Error",
          "Unable to communicate with our server. Please try again later.",
          "Yes",
          "No"
        );

        if (result) {
          alert("User clicked Yes");
        } else {
          alert("User clicked No");
        }
      }
    }
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

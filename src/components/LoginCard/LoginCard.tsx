import { useState } from "react";
import "./LoginCard.css";
import { postRequest } from "../../utils/apiRequests";
import { useAppNavigation } from "../../hooks/useAppNavigation";

function LoginCard() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { Profile } = useAppNavigation();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      email: email,
      password: password,
    };

    try {
      await postRequest("/login", payload);
      Profile();
    } catch (error) {
      console.error("Login failed:", error);
      alert(
            "Login failed. Please check your credentials and try again. " +
              error
          );
    }
  };

  return (
    <div className="login-card">
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
      <div className="loginSwitch">
        <p>Don't have an account? </p>
        <a href="/create-account">Create Account</a>
      </div>
    </div>
  );
}

export default LoginCard;

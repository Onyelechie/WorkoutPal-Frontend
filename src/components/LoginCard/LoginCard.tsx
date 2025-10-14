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

    postRequest("/login", payload)
      .then((response) => {
        if (response.status == 200) {
          console.log("Login successful");
          Profile();
        }
      })
      .catch((error) => {
        if (error?.response) {
          console.error("Login failed:", error);
          alert(
            "Login failed. Please check your credentials and try again. " +
              error.response.data
          );
        }
      });

    // try {
    //   const response = await postRequest("/login", payload);

    //   if (response.status == 200) {
    //     console.log("Login successful");
    //     Profile();
    //   }
    // } catch (error) {
    //   if(error?.response) {
    //     console.error("Login failed:", error);
    //   alert("Login failed. Please check your credentials and try again. ");
    //   }

    // }
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

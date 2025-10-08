import { useState } from "react";
import "./App.css";
import LoginCard from "./LoginCard";
import Header from "./Header";

function App() {
  return (
    <>
      <Header />
      <div id="logincard">
        <p>Login with your Google account</p>
        <LoginCard />
      </div>
    </>
  );
}

export default App;

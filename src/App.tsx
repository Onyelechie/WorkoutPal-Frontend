import { useState } from "react";
import "./style/App.css";
import LoginCard from "./LoginCard";
import Header from "./Header";
import Footer from "./Footer";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <Header />
      <Navbar />
      <div id="loginCardHolder">
        <LoginCard />
      </div>
      <Footer />
    </>
  );
}

export default App;

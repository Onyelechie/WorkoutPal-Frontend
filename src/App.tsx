import { useState } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import TestPage from "./pages/TestPage";
import LoginCard from "./LoginCard";
import Header from "./Header";
import LandingView from "./views/LandingView";

function App() {
  return (
    <>
      {/* <Header />
      <div id="logincard">
        <p>Login with your Google account</p>
        <LoginCard />
      </div>
      */}

      {/* Routing */}
      {/* Inspired from https://www.w3schools.com/react/react_router.asp */}
      <BrowserRouter>
        <Routes>
          <Route path="/TestPage" element={<TestPage/>}/>
          <Route path="/landing" element={<LandingView/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import TestPage from "./pages/TestPage";
import LoginCard from "./LoginCard";
import Header from "./Header";

function App() {
  return (
    <>
      {/* <Header />
      <div id="logincard">
        <p>Login with your Google account</p>
        <LoginCard />
      </div> */}

      <BrowserRouter>
        <Routes>
          <Route path="/TestPage" element={<TestPage/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";
import { BrowserRouter, Routes, Route } from 'react-router';
import LandingView from "./views/LandingView";
import PageNotFound from "./views/PageNotFoundView";

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
          <Route path="/landing" element={<LandingView/>}/>

          <Route path="*" element={<PageNotFound/>}/>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

import "./App.css";

import '../styles/global.css';
import Routes from "./AppRoutes";

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

      <Routes/>
    </>
  );
}

export default App;

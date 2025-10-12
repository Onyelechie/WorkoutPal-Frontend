<<<<<<< HEAD:src/App.tsx
import "./style/App.css";
import Header from "./Header";
import Footer from "./Footer";
import ProfilePage from "./ProfilePage";
import LoginCard from "./LoginCard";
=======
import "./App.css";

import '../styles/global.css';
import AppRoutes from "./AppRoutes";
>>>>>>> development:src/app/App.tsx

function App() {
  return (
    <>
<<<<<<< HEAD:src/App.tsx
      <Header />
      <div className="bodyHolder">
        <LoginCard />
      </div>
      <Footer />
=======
      {/* <Header />
      <div id="logincard">
        <p>Login with your Google account</p>
        <LoginCard />
      </div>
      */}

      <AppRoutes/>
>>>>>>> development:src/app/App.tsx
    </>
  );
}

export default App;

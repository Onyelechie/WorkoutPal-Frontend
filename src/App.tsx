import "./style/App.css";
import Header from "./Header";
import Footer from "./Footer";
import ProfilePage from "./ProfilePage";
import LoginCard from "./LoginCard";

function App() {
  return (
    <>
      <Header />
      <div className="bodyHolder">
        <LoginCard />
      </div>
      <Footer />
    </>
  );
}

export default App;

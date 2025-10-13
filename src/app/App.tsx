import '../styles/global.css';

import { BrowserRouter } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

/* Wrap everything in the app with BrowserRouter to ensure page navigation works */
function App() {
  return (
    <BrowserRouter>
      {/* Apply the header to every single page */}
      <Header/>

      <AppRoutes/>

      {/* Apply the footer to every single page */}
      <Footer/>
    </BrowserRouter>
  );
}

export default App;

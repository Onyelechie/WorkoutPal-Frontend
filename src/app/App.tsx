import '../styles/global.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes, { LOGIN_ROUTE, REGISTER_ROUTE } from "./AppRoutes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Layout() {
  const location = useLocation();

  const noHeader = [LOGIN_ROUTE, REGISTER_ROUTE];

  const hideHeader = noHeader.includes(location.pathname);

  return (
    <>
      {!hideHeader && <Header />}
      <AppRoutes />
      <Footer />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Layout />
    </BrowserRouter>
  );
}

export default App;

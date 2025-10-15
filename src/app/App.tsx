import '../styles/global.css';
import { BrowserRouter, useLocation } from "react-router-dom";
import AppRoutes from "./AppRoutes";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

function Layout() {
  const location = useLocation();

  const noHeader = ["/auth/login", "/auth/register"];

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

import LoginCard from "../components/LoginCard/LoginCard";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "../styles/Login.css";

function Login() {
    return (
    <>
    <Header />
    <div className="login-card-holder">
        <LoginCard/>
    </div>
    <Footer />
    </>
    );
}
export default Login;
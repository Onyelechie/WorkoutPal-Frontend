import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./style/LoginCard.css";

function LoginCard() {
  return (
    <div id="loginCard">
      <p>Login with your Google account</p>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          if (credentialResponse.credential)
            console.log(jwtDecode(credentialResponse.credential));
        }}
        onError={() => {
          console.log("Login Failed");
        }}
        theme="filled_black"
        size="large"
        logo_alignment="center"
        width={"50"}
      />
    </div>
  );
}

export default LoginCard;

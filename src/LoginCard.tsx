import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

function LoginCard() {
  return (
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
    />
  );
}

export default LoginCard;

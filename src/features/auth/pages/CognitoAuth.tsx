import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";

const CognitoAuth = () => {
  const navigate = useNavigate();

  const goToAuthenticator = () => {
    navigate("/authenticator");
  };

  const handleHostedUIForm = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_LOGIN_URL);
  };

  const handleHostedUIWithPKCE = () => {
    window.location.replace(
      "https://mpenava-pool.auth.eu-north-1.amazoncognito.com/oauth2/authorize?response_type=code&client_id=29affca9kq64nt68hn8s8bn2jt&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin&response_type=code&code_challenge=Eh0mg-OZv7BAyo-tdv_vYamx1boOYDulDklyXoMDtLg&code_challenge_method=S256"
    );
  };

  const handleLoginForm = () => {
    navigate("/login");
  };
  return (
    <div className="flex flex-column w-23rem p-4 gap-4 bg-white border-round-lg shadow-5">
      <div className="flex justify-content-center text-4xl font-normal">
        Cognito Auth
      </div>
      <div className="flex flex-column">
        <div className="flex flex-column gap-4">
          <Button
            label="Authenticator"
            severity="secondary"
            onClick={goToAuthenticator}
            pt={{
              root: { className: "p-2 w-full bg-gray-600 border-round-sm" },
            }}
          ></Button>
          <Button
            label="Hosted UI"
            severity="secondary"
            onClick={handleHostedUIForm}
            pt={{
              root: { className: "p-2 w-full bg-green-500 border-round-sm" },
            }}
          ></Button>
          <Button
            label="Hosted UI with PKCE"
            severity="secondary"
            onClick={handleHostedUIWithPKCE}
            pt={{
              root: { className: "p-2 w-full bg-yellow-300 border-round-sm" },
            }}
          ></Button>
          <Button
            label="Go to login"
            severity="secondary"
            onClick={handleLoginForm}
            pt={{
              root: { className: "p-2 w-full bg-blue-500 border-round-sm" },
            }}
          ></Button>
        </div>
      </div>
    </div>
  );
};

export default CognitoAuth;

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

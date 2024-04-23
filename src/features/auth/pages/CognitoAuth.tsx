import { Button } from "primereact/button";
import { useNavigate } from "react-router-dom";
import { setCookie } from "../../../helpers/cookies.helper";

const sha256 = async (str: string): Promise<ArrayBuffer> => {
  return await crypto.subtle.digest("SHA-256", new TextEncoder().encode(str));
};

const generateNonce = async (): Promise<string> => {
  const hash = await sha256(
    crypto.getRandomValues(new Uint32Array(4)).toString()
  );
  const hashArray = Array.from(new Uint8Array(hash));
  return hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
};

const base64URLEncode = (string: ArrayBuffer): string => {
  return btoa(String.fromCharCode.apply(null, [...new Uint8Array(string)]))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const CognitoAuth = () => {
  const navigate = useNavigate();

  const goToAuthenticator = () => {
    navigate("/authenticator");
  };

  const handleHostedUIForm = () => {
    window.location.replace(import.meta.env.VITE_COGNITO_LOGIN_URL);
  };

  const handleHostedUIWithPKCE = async () => {
    const code_verifier = await generateNonce();
    const code_challenge = base64URLEncode(await sha256(code_verifier));
    setCookie("code_verifier", code_verifier);
    window.location.replace(
      "https://mpenava-pool.auth.eu-north-1.amazoncognito.com/login?response_type=code&client_id=" +
        import.meta.env.VITE_COGNITO_CLIENT_ID +
        "&redirect_uri=http%3A%2F%2Flocalhost%3A5173%2Fadmin&code_challenge=" +
        code_challenge +
        "&code_challenge_method=S256"
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

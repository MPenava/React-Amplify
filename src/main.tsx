import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import AuthContext from "./providers/auth/context/AuthContext.tsx";

import { Amplify } from "aws-amplify";
import { CookieStorage } from "aws-amplify/utils";
import { cognitoUserPoolsTokenProvider } from "aws-amplify/auth/cognito";

//import "primereact/resources/themes/lara-light-cyan/theme.css";
import "./providers/theme/theme.css";
import "primeicons/primeicons.css";
import "primeflex/primeflex.css";
import { PrimeReactProvider } from "primereact/api";

Amplify.configure({
  Auth: {
    Cognito: {
      //  Amazon Cognito User Pool ID
      userPoolId: import.meta.env.VITE_COGNITO_USER_POOL_ID,
      // OPTIONAL - Amazon Cognito Web Client ID (26-char alphanumeric string)
      userPoolClientId: import.meta.env.VITE_COGNITO_CLIENT_ID,
      // OPTIONAL - This is used when autoSignIn is enabled for Auth.signUp
      // 'code' is used for Auth.confirmSignUp, 'link' is used for email link verification
      signUpVerificationMethod: "code", // 'code' | 'link'
    },
  },
});

cognitoUserPoolsTokenProvider.setKeyValueStorage(new CookieStorage());

const pt = {
  datatable: {
    root: { className: "w-full" },
    wrapper: { className: "border-round-sm" },
  },
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <PrimeReactProvider value={{ pt }}>
      <AuthContext>
        <App />
      </AuthContext>
    </PrimeReactProvider>
  </React.StrictMode>
);

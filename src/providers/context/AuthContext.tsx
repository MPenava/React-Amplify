import { createContext, useContext } from "react";
import {
  signUp,
  confirmSignUp,
  signIn,
  signOut,
  confirmSignIn,
  getCurrentUser,
  AuthUser,
  fetchDevices,
} from "aws-amplify/auth";

type TAuthContext = {
  register: (
    username: string,
    password: string,
    email: string,
    phone_number: string
  ) => {};
  signUpConfirmation: (email: string, code: string) => void;
  login: (username: string, password: string) => Promise<any>;
  currentAuthenticatedUser: () => Promise<AuthUser | undefined>;
  logout: () => void;
  handleSignInConfirmation: (code: string) => Promise<any>;
  fetchUserDevices: () => Promise<void>;
};

type TAuthContextProps = {
  children: JSX.Element;
};

const CognitoAuthContext = createContext<TAuthContext | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(CognitoAuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

const AuthContext = ({ children }: TAuthContextProps) => {
  const register = async (
    username: string,
    password: string,
    email: string,
    phone_number: string
  ) => {
    const { userId } = await signUp({
      username,
      password,
      options: {
        userAttributes: {
          email,
          phone_number, // E.164 number convention
        },
      },
    });
    console.log(userId);
    return userId;
  };

  const signUpConfirmation = async (
    username: string,
    confirmationCode: string
  ) => {
    try {
      const { isSignUpComplete } = await confirmSignUp({
        username,
        confirmationCode,
      });
      return isSignUpComplete;
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  };

  const login = async (username: string, password: string) => {
    try {
      const { isSignedIn } = await signIn({ username, password });
      return isSignedIn;
    } catch (error) {
      throw error;
    }
  };

  const handleSignInConfirmation = async (code: string) => {
    try {
      const res = await confirmSignIn({ challengeResponse: code });
      return res;
    } catch (error) {
      throw error;
    }
  };

  const currentAuthenticatedUser = async () => {
    try {
      const { username, userId, signInDetails } = await getCurrentUser();
      return { username, userId, signInDetails };
    } catch (err) {
      return;
    }
  };

  const logout = async () => {
    try {
      await signOut();
    } catch (error) {
      console.log("error signing out: ", error);
    }
  };

  const fetchUserDevices = async () => {
    try {
      const output = await fetchDevices();
      console.log(output);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <CognitoAuthContext.Provider
      value={{
        register,
        signUpConfirmation,
        login,
        currentAuthenticatedUser,
        logout,
        handleSignInConfirmation,
        fetchUserDevices,
      }}
    >
      {children}
    </CognitoAuthContext.Provider>
  );
};

export default AuthContext;

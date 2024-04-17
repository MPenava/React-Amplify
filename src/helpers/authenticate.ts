import {
  AuthenticationDetails,
  CognitoUserPool,
  CognitoUser,
  CognitoUserAttribute,
} from "amazon-cognito-identity-js";

const poolData = {
  UserPoolId: `${import.meta.env.VITE_COGNITO_USER_POOL_ID}`,
  ClientId: `${import.meta.env.VITE_COGNITO_CLIENT_ID}`,
};

const userpool = new CognitoUserPool(poolData);

export const signIn = (email: string, password: string) => {
  return new Promise((resolve, reject) => {
    const user = new CognitoUser({
      Username: email,
      Pool: userpool,
    });

    const authDetails = new AuthenticationDetails({
      Username: email,
      Password: password,
    });

    user.authenticateUser(authDetails, {
      onSuccess: (result) => {
        resolve(result);
      },
      onFailure: (err) => {
        reject(err);
      },
    });
  });
};

export const signUp = (
  username: string,
  email: string,
  password: string,
  phone: string
) => {
  return new Promise((resolve, reject) => {
    const attributeList = [];

    const attributeEmail = new CognitoUserAttribute({
      Name: "email",
      Value: email,
    });

    const attributePhone = new CognitoUserAttribute({
      Name: "phone_number",
      Value: phone,
    });

    attributeList.push(attributeEmail);
    attributeList.push(attributePhone);

    userpool.signUp(username, password, attributeList, [], (err, result) => {
      if (err) {
        reject(err.message || JSON.stringify(err));
      } else {
        if (result) {
          const cognitoUser = result.user;
          resolve(
            "User signed up successfully. Username: " +
              cognitoUser.getUsername()
          );
        } else {
          reject("User sign up result is undefined.");
        }
      }
    });
  });
};

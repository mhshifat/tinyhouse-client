import React from "react";
import { GoogleLogin } from "react-google-login";
import { useHistory } from "react-router-dom";
import {
  displayErrorMessage,
  displaySuccessNotification,
} from "../../../../../lib/utils/index";
import { useAuth } from "../../../../providers/components/AuthProvider/index";

const LoginButton = () => {
  const { login } = useAuth();
  const history = useHistory();

  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_G_CLIENT_ID}
      render={(renderProps) => (
        <button
          onClick={renderProps.onClick}
          disabled={renderProps.disabled}
          className="log-in-card__google-button"
        >
          <img
            src="/images/google_logo.jpg"
            alt="Google Logo"
            className="log-in-card__google-button-logo"
          />
          <span className="log-in-card__google-button-text">
            Login with Google
          </span>
        </button>
      )}
      onSuccess={(data: any) => {
        login({
          name:
            data.profileObj.familyName ||
            data.profileObj.givenName ||
            data.profileObj.name,
          contact: data.profileObj.email,
          avatar: data.profileObj.imageUrl,
        })
          .then((user) => {
            if (user) {
              displaySuccessNotification("You have been logged in!");
              history.push(`/user/${user._id}`);
            }
          })
          .catch((err) =>
            displayErrorMessage("Something went wrong, please try again later!")
          );
      }}
      onFailure={() => {
        console.log("Failure");
      }}
    >
      <p>Login</p>
    </GoogleLogin>
  );
};

export default LoginButton;

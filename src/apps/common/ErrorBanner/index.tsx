import { Alert } from "antd";
import React from "react";

interface Props {
  message?: string;
  description?: string;
}

const ErrorBanner: React.FC<Props> = ({
  message = "Uh oh! Something went wrong!",
  description = "Please check your network & try again later!",
}) => {
  return (
    <Alert
      banner
      closable
      message={message}
      description={description}
      type="error"
      className="error-banner"
    />
  );
};

export default ErrorBanner;

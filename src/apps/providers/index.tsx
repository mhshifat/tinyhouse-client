import React from "react";
import { ApolloProvider } from "react-apollo";
import { client } from "../../graphql";
import AuthProvider from "./components/AuthProvider";

const Providers: React.FC = ({ children }) => {
  return (
    <ApolloProvider client={client}>
      <AuthProvider>{children}</AuthProvider>
    </ApolloProvider>
  );
};

export default Providers;

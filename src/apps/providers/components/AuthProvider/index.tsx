import React, { createContext, useContext, useState } from "react";
import {
  LoginWithGoogleInput,
  useLoginMutation,
  useLogoutMutation,
} from "../../../../graphql/generated";

interface IAuthContext {
  login: (data: LoginWithGoogleInput) => Promise<any>;
  logout: () => Promise<any>;
  setAuthState: (data: IAuthState) => void;
  authState: IAuthState;
  loading: boolean;
}
interface IAuthState {
  idLoggedIn: boolean;
  id: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
  token: string | null;
  hasWallet: boolean;
}
const AuthContext = createContext<IAuthContext | null>(null);

const initialAuthState = {
  idLoggedIn: false,
  id: null,
  username: null,
  email: null,
  avatar: null,
  token: null,
  hasWallet: false,
};
const AuthProvider: React.FC = ({ children }) => {
  const [authState, setAuthState] = useState<IAuthState>(initialAuthState);
  const [login, { loading: loginLoading }] = useLoginMutation();
  const [logout, { loading: logoutLoading }] = useLogoutMutation();

  const handleLogin = (data: LoginWithGoogleInput) => {
    return login({
      variables: {
        input: data,
      },
    })
      .then((res) => {
        const userData = res.data?.login;
        if (userData) {
          setAuthState({
            idLoggedIn: true,
            id: userData._id,
            username: userData.name,
            email: userData.contact,
            avatar: userData.avatar,
            token: null,
            hasWallet: userData.hasWallet,
          });
          return Promise.resolve(userData);
        }
        return Promise.reject("Login failed!");
      })
      .catch((err) => Promise.reject(err));
  };

  const handleLogout = async () => {
    setAuthState(initialAuthState);
    return logout()
      .then(() => Promise.resolve(true))
      .catch((err) => Promise.reject(false));
  };

  return (
    <AuthContext.Provider
      value={{
        login: handleLogin,
        authState,
        loading: loginLoading || logoutLoading,
        logout: handleLogout,
        setAuthState,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () =>
  useContext(AuthContext) as IAuthContext & IAuthState;

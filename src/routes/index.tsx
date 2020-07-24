import { Layout, Spin } from "antd";
import React, { useEffect, useRef } from "react";
import { Route, Switch } from "react-router-dom";
import AppHeaderSkeleton from "../apps/layouts/AppHeaderSkeleton";
import Header from "../apps/layouts/Header";
import { useAuth } from "../apps/providers/components/AuthProvider/index";
import { useGetMeQuery } from "../graphql/generated";
import { routes } from "./routes";

const Routes = () => {
  const { data, loading } = useGetMeQuery();
  const { setAuthState } = useAuth();
  const setAuthStateRef = useRef(setAuthState);

  useEffect(() => {
    if (data) {
      const user = data.me;
      if (user)
        setAuthStateRef.current({
          idLoggedIn: true,
          id: user._id,
          username: user.name,
          email: user.contact,
          avatar: user.avatar,
          token: null,
          hasWallet: user.hasWallet,
        });
    }
  }, [data]);

  if (loading) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching Tinyhouse" />
        </div>
      </Layout>
    );
  }
  return (
    <Layout id="app">
      <Header />
      <Switch>
        {routes.map((item, index) => (
          <Route key={index} {...item} />
        ))}
      </Switch>
    </Layout>
  );
};

export default Routes;

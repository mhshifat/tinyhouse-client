import { Card, Layout, Spin, Typography } from "antd";
import React from "react";
import { useAuth } from "../../providers/components/AuthProvider/index";
import LoginButton from "./components/LoginButton";

const { Content } = Layout;
const { Text, Title } = Typography;
const Login = () => {
  const { loading } = useAuth();

  if (loading) {
    return (
      <Content className="log-in">
        <Spin size="large" tip="Logging you in..." />
      </Content>
    );
  }
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title className="log-in-card__intro-title" level={3}>
            <span role="img" aria-label="wave">
              👋
            </span>
          </Title>
          <Title className="log-in-card__intro-title" level={3}>
            Log in to TinyHouse!
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <LoginButton />
        <Text type="secondary">
          Note: By signing in, you'll be redirected to the Google consent form
          to sign in with your Google account.
        </Text>
      </Card>
    </Content>
  );
};

export default Login;

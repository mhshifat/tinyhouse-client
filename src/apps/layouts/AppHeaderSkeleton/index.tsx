import { Layout } from "antd";
import React from "react";

const { Header } = Layout;
const AppHeaderSkeleton = () => {
  return (
    <Header className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <img src="/images/tinyhouse-logo.png" alt="App logo" />
        </div>
      </div>
    </Header>
  );
};

export default AppHeaderSkeleton;

import { Layout } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import MenuItems from "./components/MenuItems";

const { Header: AppHeader } = Layout;
const Header = () => {
  return (
    <AppHeader className="app-header">
      <div className="app-header__logo-search-section">
        <div className="app-header__logo">
          <Link to="/">
            <img src="/images/tinyhouse-logo.png" alt="App logo" />
          </Link>
        </div>
      </div>
      <div className="app-header__menu-section">
        <MenuItems />
      </div>
    </AppHeader>
  );
};

export default Header;

import {
  HomeOutlined,
  LoadingOutlined,
  LogoutOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Menu } from "antd";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { displaySuccessNotification } from "../../../../../lib/utils/index";
import { useAuth } from "../../../../providers/components/AuthProvider/index";

const { Item, SubMenu } = Menu;
const MenuItems = () => {
  const { authState, logout, loading } = useAuth();
  const history = useHistory();

  const subMenuLogin = authState.idLoggedIn ? (
    <SubMenu title={<Avatar src={authState.avatar || ""} />}>
      <Item key="/user">
        <Link to={`/user/${authState.id}`}>
          <UserOutlined />
          Profile
        </Link>
      </Item>
      <Item key="/logout">
        <div
          onClick={() =>
            logout().then(() => {
              displaySuccessNotification("You have successfully logged out!");
              history.push("/login");
            })
          }
        >
          <LogoutOutlined />
          Log out
        </div>
      </Item>
    </SubMenu>
  ) : (
    <Item>
      <Link to="/login">
        <Button type="primary">Sign In</Button>
      </Link>
    </Item>
  );

  return (
    <Menu mode="horizontal" selectable={false} className="menu">
      <Item key="/host">
        {loading ? (
          <LoadingOutlined />
        ) : (
          <Link to="/host">
            <HomeOutlined />
            Host
          </Link>
        )}
      </Item>
      {!loading && subMenuLogin}
    </Menu>
  );
};

export default MenuItems;

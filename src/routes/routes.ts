import { RouteComponentProps } from "react-router-dom";
import Home from "../apps/pages/Home";
import Listing from "../apps/pages/Listing/index";
import Listings from "../apps/pages/Listings";
import Login from "../apps/pages/Login";
import NotFound from "../apps/pages/NotFound";
import User from "../apps/pages/User/index";

export interface IRoute {
  exact: boolean;
  path: string;
  type: "common" | "public" | "private";
  component: React.FC<RouteComponentProps<any>>;
}

export const routes: IRoute[] = [
  {
    exact: true,
    path: "/",
    type: "common",
    component: Home,
  },
  {
    exact: true,
    path: "/listings",
    type: "common",
    component: Listings,
  },
  {
    exact: true,
    path: "/login",
    type: "public",
    component: Login,
  },
  {
    exact: true,
    path: "/user/:id",
    type: "common",
    component: User,
  },
  {
    exact: true,
    path: "/listing/:id",
    type: "common",
    component: Listing,
  },
  {
    exact: true,
    path: "",
    type: "common",
    component: NotFound,
  },
];

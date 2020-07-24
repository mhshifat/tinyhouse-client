import "antd/dist/antd.min.css";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import Providers from "./apps/providers";
import "./index.css";
import Routes from "./routes";

ReactDOM.render(
  <Providers>
    <BrowserRouter>
      <Routes />
    </BrowserRouter>
  </Providers>,
  document.getElementById("root")
);

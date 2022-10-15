import React from "react";
import ReactDOM from "react-dom/client"; // 路由
import Router from "./router";
import store from "./store/index"; // 状态管理
import { Provider } from "react-redux";
import "./assets/css/index.less"; // 全局样式
import "antd/dist/antd.css"; // antd UI 样式
import "default-passive-events";
// 添加事件管理者'passive'，来阻止'touchstart'事件，让页面更加流畅。 解决chrome下的warning问题

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <Router />
  </Provider>
);

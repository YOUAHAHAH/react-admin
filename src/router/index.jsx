import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthRoute } from "./AuthRoute";
import routers from "./router.js";

import Login from "../Layout/Login/Login";
import Reg from "../Layout/Login/Reg";
import App from "../App";
import Error from "../Layout/Error/Error";
import MobileError from "../Layout/Error/MobileError";

// 自定义标题
const pageTitle = import.meta.env.VITE_DEFAULT_TITLE;
const DomTitle = ({ item }) => {
  document.title = item.title || pageTitle;
  return <item.component />;
};

const BaseRouter = () => (
  <Router>
    <Routes>
      {/* 登录 */}
      <Route path="/Login" element={<Login />}>
        <Route element={<Navigate to="/Login" />}></Route>
      </Route>
      <Route path="/Reg" element={<Reg />} />
      {/* 需要鉴权页面 */}
      <Route
        path="/"
        element={
          // 鉴权，判断是否有token
          <AuthRoute>
            <App />
          </AuthRoute>
        }
      >
        {routers.map((item, index) => {
          return (
            <Route
              key={`routers${index}`}
              exact
              path={item.path}
              element={<DomTitle item={item} />}
            />
          );
        })}
      </Route>
      {/* 错误页面 */}
      <Route path="/*" element={<Error />}></Route>
      <Route path="/MobileError" element={<MobileError />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;

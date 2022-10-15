import {
  HashRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { AuthRoute } from "./AuthRoute";

// const App = lazy(() => import("../App"));
// const Login = lazy(() => import("../Layout/Login/Login"));
// const Main = lazy(() => import("../pages/Home/Main"));
// const UserList = lazy(() => import("../pages/List/UserList"));
// const SearchList = lazy(() => import("../pages/List/SearchList"));
// const CardList = lazy(() => import("../pages/List/CardList"));
// const StepsList = lazy(() => import("../pages/List/StepsList"));
// const BaiDuMapCharts = lazy(() => import("../pages/Charts/BaiDuMapCharts"));
// const GaoDeMapCharts = lazy(() => import("../pages/Charts/GaoDeMapCharts"));
// const EchartsLine = lazy(() => import("../pages/Charts/EchartsLine"));
// const MessageList = lazy(() => import("../pages/Message/MessageList"));
// const PublishMessage = lazy(() => import("../pages/Message/PublishMessage"));
// const Error = lazy(() => import("../Layout/Error/Error"));

import Login from "../Layout/Login/Login";
import Reg from "../Layout/Login/Reg";
import App from "../App";
import Main from "../pages/Home/Main";
import UserList from "../pages/List/UserList";
import SearchList from "../pages/List/SearchList";
import CardList from "../pages/List/CardList";
import StepsList from "../pages/List/StepsList";
import BaiDuMapCharts from "../pages/Charts/BaiDuMapCharts";
import GaoDeMapCharts from "../pages/Charts/GaoDeMapCharts";
import EchartsLine from "../pages/Charts/EchartsLine";
import MessageList from "../pages/Message/MessageList";
import PublishMessage from "../pages/Message/PublishMessage";
import Result403 from "../pages/Result/Result403";
import Result404 from "../pages/Result/Result404";
import Result500 from "../pages/Result/Result500";
import Error from "../Layout/Error/Error";
import MobileError from "../Layout/Error/MobileError";

const BaseRouter = () => (
  <Router>
    <Routes>
      {/* 登录 */}
      <Route path="/Login" element={<Login />}>
        <Route element={<Navigate to="/Login" />}></Route>
      </Route>
      <Route path="/Reg" element={<Reg />} />
      <Route
        path="/"
        element={
          // 鉴权，判断是否有token
          <AuthRoute>
            <App />
          </AuthRoute>
        }
      >
        <Route path="/" index element={<Main />}></Route>
        <Route path="/Home/AboutHome" element={<Main />}></Route>
        <Route path="/List/UserList" element={<UserList />}></Route>
        <Route path="/List/SearchList" element={<SearchList />}></Route>
        <Route path="/List/CardList" element={<CardList />}></Route>
        <Route path="/List/StepsList" element={<StepsList />}></Route>
        <Route path="/Charts/BaiDuMap" element={<BaiDuMapCharts />}></Route>
        <Route path="/Charts/GaoDeMap" element={<GaoDeMapCharts />}></Route>
        <Route path="/Charts/EchartsLine" element={<EchartsLine />}></Route>
        <Route path="/Message/MessageList" element={<MessageList />}></Route>
        <Route
          path="/Message/PublishMessage"
          element={<PublishMessage />}
        ></Route>
        <Route path="/Result/Result403" element={<Result403 />}></Route>
        <Route path="/Result/Result404" element={<Result404 />}></Route>
        <Route path="/Result/Result500" element={<Result500 />}></Route>
      </Route>
      {/* 错误页面 */}
      <Route path="/*" element={<Error />}></Route>
      <Route path="/MobileError" element={<MobileError />}></Route>
    </Routes>
  </Router>
);

export default BaseRouter;

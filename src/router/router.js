/**
 *  公共路由
 */
import Main from "../pages/Home/Main";
import Technology from "../pages/Home/Technology";
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
import PermissionsPage from "../pages/Permissions/PermissionsPage";

let routers = [
  {
    title: "关于ADMIN",
    path: "/Home/AboutHome",
    component: Main,
  },
  {
    title: "技术核心",
    path: "/Home/Technology",
    component: Technology,
  },
  {
    title: "用户列表",
    path: "/List/UserList",
    component: UserList,
  },
  {
    title: "查询列表",
    path: "/List/SearchList",
    component: SearchList,
  },
  {
    title: "卡片列表",
    path: "/List/CardList",
    component: CardList,
  },
  {
    title: "分布列表",
    path: "/List/StepsList",
    component: StepsList,
  },
  {
    title: "百度地图",
    path: "/Charts/BaiDuMap",
    component: BaiDuMapCharts,
  },
  {
    title: "高德地图",
    path: "/Charts/GaoDeMap",
    component: GaoDeMapCharts,
  },
  {
    title: "折线图",
    path: "/Charts/EchartsLine",
    component: EchartsLine,
  },
  {
    title: "消息列表",
    path: "/Message/MessageList",
    component: MessageList,
  },
  {
    title: "发布消息",
    path: "/Message/PublishMessage",
    component: PublishMessage,
  },
  {
    title: "错误页面403",
    path: "/Result/Result403",
    component: Result403,
  },
  {
    title: "错误页面404",
    path: "/Result/Result404",
    component: Result404,
  },
  {
    title: "错误页面500",
    path: "/Result/Result500",
    component: Result500,
  },
  {
    title: "页面权限",
    path: "/Permissions/PermissionsPage",
    component: PermissionsPage,
  },
];

import PRouter from "./Permission";

routers = [...routers, ...PRouter];

export default routers;

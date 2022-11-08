/**
 *  权限路由展示
 *  当前只有两个不同权限 admin test
 */
import getToken from "../utils/getToken";

import PermissionsA from "../pages/Permissions/PermissionsA";
import PermissionsT from "../pages/Permissions/PermissionsT";

// admin
const PerRoutersA = [
  {
    title: "权限测试页面A",
    path: "/Permissions/PermissionsA",
    component: PermissionsA,
  },
];

// test
const PerRoutersT = [
  {
    title: "权限测试页面T",
    path: "/Permissions/PermissionsT",
    component: PermissionsT,
  },
];

let PRouter = [];

if (getToken() === "456") {
  PRouter = [...PerRoutersA];
} else if (getToken() === "999") {
  PRouter = [...PerRoutersT];
} else {
  PRouter = [];
}

export default PRouter;

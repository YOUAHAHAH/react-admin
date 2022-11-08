import { Navigate, useLocation } from "react-router-dom";
import getToken from "../utils/getToken";

function AuthRoute({ children }) {
  const location = useLocation();
  // 获取token
  const tokenStr = getToken();
  // 如果token存在 直接正常渲染
  if (tokenStr) {
    if (location.pathname === "/") {
      return <Navigate to="/Home/AboutHome" replace />;
    }
    return <>{children}</>;
  }
  // 如果token不存在，重定向到登录路由
  else {
    return <Navigate to="/Login" replace />;
  }
}
export { AuthRoute };

import { Navigate } from "react-router-dom";
import getToken from "../utils/getToken";

function AuthRoute({ children }) {
  // 获取token
  const tokenStr = getToken();
  // 如果token存在 直接正常渲染
  if (tokenStr) {
    return <>{children}</>;
  }
  // 如果token不存在，重定向到登录路由
  else {
    return <Navigate to="/Login" replace />;
  }
}
export { AuthRoute };

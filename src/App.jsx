import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";
import AppHeader from "./Layout/Header/Header";
import AppNavigation from "./Layout/Navigation/Navigation";
// import AppFooter from "./Layout/Footer/Footer";
import AppMean from "./Layout/Mean/Mean";

const { Content } = Layout;

const App = () => {
  const navigate = useNavigate();
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (size.width <= 900) {
      navigate("/MobileError");
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <>
      <Layout style={{ height: "100vh" }}>
        <AppMean />
        <Layout className="site-layout">
          <AppHeader />
          <AppNavigation />
          <Content
            className="site-layout-background"
            style={{ margin: "10px" }}
          >
            <Outlet />
          </Content>
          {/* <AppFooter /> */}
        </Layout>
      </Layout>
    </>
  );
};

export default App;

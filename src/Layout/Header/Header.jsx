import React from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Layout, Dropdown, Menu, Typography } from "antd";
import { UserOutlined, LoginOutlined } from "@ant-design/icons";
import "./Header.less";
import avatar from "../../assets/img/bg.jpg";

const Header = (props) => {
  const { Header } = Layout;
  const navigate = useNavigate();

  const onClick = ({ key }) => {
    if (key === "1") {
      navigate("/Home/AboutHome");
    } else if (key === "2") {
      navigate("/Login");
      props.loseToken();
      localStorage.removeItem("react-token");
      localStorage.removeItem("react-userInfo");
    }
  };

  const menu = (
    <Menu
      selectable
      onClick={onClick}
      items={[
        {
          key: "1",
          label: "个人中心",
          icon: <UserOutlined />,
        },
        {
          type: "divider",
        },
        {
          key: "2",
          label: "退出登录",
          icon: <LoginOutlined />,
        },
      ]}
    />
  );

  return (
    <Header className="site-layout-background">
      <Dropdown overlay={menu} placement="bottomRight">
        <Typography.Link>
          <img
            className="img"
            src={
              localStorage.getItem("react-userInfo")
                ? JSON.parse(localStorage.getItem("react-userInfo")).picUrl
                  ? "http://admin.youah.cc" +
                    JSON.parse(localStorage.getItem("react-userInfo")).picUrl
                  : avatar
                : navigate("/Login")
            }
          />
        </Typography.Link>
      </Dropdown>
    </Header>
  );
};

// 将 token 销毁
const mapDispatchToProps = (dispatch) => {
  return {
    loseToken() {
      const action = { type: "loseUserToken" };
      dispatch(action);
    },
  };
};

export default connect(null, mapDispatchToProps)(Header);

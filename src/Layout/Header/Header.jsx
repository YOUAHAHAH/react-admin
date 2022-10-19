import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { loseUserToken } from "../../store/actions/userToken";
import { createMessageAsync } from "../../store/actions/Message";
import { Layout, Dropdown, Menu, Typography, Badge, Tooltip } from "antd";
import { UserOutlined, LoginOutlined, BellOutlined } from "@ant-design/icons";
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

  const getUnreadMsg = () => {
    navigate("/Message/MessageList");
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

  useEffect(() => {
    props.getMessage();
  }, []);

  return (
    <Header className="site-layout-background">
      <div
        style={{ marginRight: "10px", cursor: "pointer" }}
        onClick={getUnreadMsg}
      >
        <Tooltip
          placement="bottomLeft"
          title={
            props.Message > 0 ? props.Message + "条未读消息" : "暂无未读消息"
          }
        >
          <Badge
            dot={props.Message > 0 ? true : false}
            style={{ top: "5px", right: "5px" }}
          >
            <BellOutlined
              style={{
                fontSize: 24,
              }}
            />
          </Badge>
        </Tooltip>
      </div>
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

export default connect(
  (state) => ({
    info: state.userInfo,
    token: state.userToken,
    Message: state.Message,
  }),
  {
    getMessage: createMessageAsync,
    loseToken: loseUserToken,
  }
)(Header);

import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Menu, Layout } from "antd";
import {
  AntDesignOutlined,
  HomeOutlined,
  BulbOutlined,
  SettingOutlined,
  UnorderedListOutlined,
  UserOutlined,
  SelectOutlined,
  CreditCardOutlined,
  AreaChartOutlined,
  BarChartOutlined,
  SendOutlined,
  MessageOutlined,
  MailOutlined,
  CloseOutlined,
  QuestionOutlined,
  ExclamationOutlined,
  ProfileOutlined,
} from "@ant-design/icons";
import "./Mean.less";
import {
  PbulicMessageIcon,
  BaiDuMapIcon,
  GaoDeMapIcon,
  ResultIcon,
  PermissionsIcon,
  PermissionsIcon1,
} from "../../components/Icon/Icon";
import getToken from "../../utils/getToken.jsx";

const { Sider } = Layout;

export default function Mean() {
  function getItem(label, key, icon, children) {
    return {
      label,
      key,
      icon,
      children,
    };
  }

  // 权限展示
  const PerItem = () => {
    if (getToken() === "456") {
      return [getItem("权限测试页面A", "PermissionsA", <ProfileOutlined />)];
    } else if (getToken() === "999") {
      return [getItem("权限测试页面T", "PermissionsT", <ProfileOutlined />)];
    } else {
      return null;
    }
  };

  const items = [
    getItem("首页", "Home", <HomeOutlined />, [
      getItem("关于ADMINR", "AboutHome", <BulbOutlined />),
      getItem("技术核心", "Technology", <SettingOutlined />),
    ]),
    getItem("列表", "List", <UnorderedListOutlined />, [
      getItem("用户列表", "UserList", <UserOutlined />),
      getItem("查询列表", "SearchList", <SelectOutlined />),
      getItem("卡片列表", "CardList", <CreditCardOutlined />),
      getItem("分布列表", "StepsList", <SendOutlined />),
    ]),
    getItem("图表", "Charts", <AreaChartOutlined />, [
      getItem("百度地图", "BaiDuMap", <BaiDuMapIcon />),
      getItem("高德地图", "GaoDeMap", <GaoDeMapIcon />),
      getItem("折线图", "EchartsLine", <BarChartOutlined />),
    ]),
    getItem("消息", "Message", <MailOutlined />, [
      getItem("消息列表", "MessageList", <MessageOutlined />),
      getItem("发布消息", "PublishMessage", <PbulicMessageIcon />),
    ]),
    getItem("结果", "Result", <ResultIcon />, [
      getItem("403", "Result403", <CloseOutlined />),
      getItem("404", "Result404", <QuestionOutlined />),
      getItem("500", "Result500", <ExclamationOutlined />),
    ]),
    getItem("权限设置", "Permissions", <PermissionsIcon1 />, [
      getItem("页面权限", "PermissionsPage", <PermissionsIcon />),
      PerItem()[0],
    ]),
  ];

  const rootSubmenuKeys = [
    "Home",
    "List",
    "Charts",
    "Message",
    "Result",
    "Permissions",
  ];

  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [current, setCurrent] = useState(
    pathname.split("/").reverse()[0] || "AboutHome"
  );
  const [openKeys, setOpenKeys] = useState(
    [pathname.split("/").reverse()[1]] || "Home"
  );
  const [collapsed, setCollapsed] = useState(false);

  // 点击子菜单进行路由跳转
  const onClick = (e) => {
    navigate("/" + e.keyPath.reverse().join("/"));
    setCurrent(e.key);
  };

  // 控制只展开一个父级菜单
  const onOpenChange = (keys) => {
    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  useEffect(() => {
    setCurrent(pathname.split("/").reverse()[0] || "AboutHome");
    setOpenKeys([pathname.split("/").reverse()[1]] || "Home");
  }, [pathname]);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
      theme="light"
    >
      <div
        className="logo"
        style={{ padding: collapsed ? "0 calc(50% - 16px / 2)" : "24px" }}
      >
        <AntDesignOutlined />
        <p style={{ display: collapsed ? "none" : "" }}>ADMINR</p>
      </div>
      <Menu
        mode="inline"
        theme="light"
        openKeys={openKeys}
        selectedKeys={[current]}
        onClick={onClick}
        onOpenChange={onOpenChange}
        items={items}
      />
    </Sider>
  );
}

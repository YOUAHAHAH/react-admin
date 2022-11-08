import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Tabs } from "antd";
import "./Navigation.less";

const tabsIndex = [
  {
    key: "1",
    label: "关于ADMIN",
    path: "/Home/AboutHome",
  },
  {
    key: "2",
    label: "技术核心",
    path: "/Home/Technology",
  },
  {
    key: "3",
    label: "用户列表",
    path: "/List/UserList",
  },
  {
    key: "4",
    label: "查询列表",
    path: "/List/SearchList",
  },
  {
    key: "5",
    label: "卡片列表",
    path: "/List/CardList",
  },
  {
    key: "6",
    label: "分布列表",
    path: "/List/StepsList",
  },
  {
    key: "7",
    label: "百度地图",
    path: "/Charts/BaiDuMap",
  },
  {
    key: "8",
    label: "高德地图",
    path: "/Charts/GaoDeMap",
  },
  {
    key: "9",
    label: "折线图",
    path: "/Charts/EchartsLine",
  },
  {
    key: "10",
    label: "消息列表",
    path: "/Message/MessageList",
  },
  {
    key: "11",
    label: "发布消息",
    path: "/Message/PublishMessage",
  },
  {
    key: "12",
    label: "错误页面403",
    path: "/Result/Result403",
  },
  {
    key: "13",
    label: "错误页面404",
    path: "/Result/Result404",
  },
  {
    key: "14",
    label: "错误页面500",
    path: "/Result/Result500",
  },
  {
    key: "15",
    label: "页面权限",
    path: "/Permissions/PermissionsPage",
  },
  {
    key: "16",
    label: "权限测试页面A",
    path: "/Permissions/PermissionsA",
  },
  {
    key: "17",
    label: "权限测试页面T",
    path: "/Permissions/PermissionsT",
  },
];

export default function Navigation() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const [activeKey, setActiveKey] = useState(() => {
    const tabs = tabsIndex.find((item) => item.path === pathname);
    return tabs === undefined ? tabsIndex[0].key : tabs.key; // 第一次打开页面 tabs 为 undefined
  });
  const [items, setItems] = useState(() => {
    const tabs = tabsIndex.find((item) => item.path === pathname);
    return tabs === undefined ? [tabsIndex[0]] : [tabs]; // 第一次打开页面 tabs 为 undefined
  });

  const onEdit = (targetKey) => {
    const targetIndex = items.findIndex((pane) => pane.key === targetKey);
    const newPanes = items.filter((pane) => pane.key !== targetKey);
    // 判断是否为最后一个
    if (newPanes.length !== 0) {
      if (newPanes.length && targetKey === activeKey) {
        const { key } =
          newPanes[
            targetIndex === newPanes.length ? targetIndex - 1 : targetIndex
          ];
        setActiveKey(key);
        navigate(newPanes.pop().path); // 删除默  认变为为此数组的最后一个 ==》 标签的最前面那个
      }
    } else {
      return;
    }
    setItems(newPanes);
  };

  useEffect(() => {
    const tabs = tabsIndex.find((item) => item.path === pathname);
    setActiveKey(
      (key) => (key = tabs === undefined ? tabsIndex[0].key : tabs.key) // 第一次打开页面 tabs 为 undefined
    );
    if (items[0] !== tabs) {
      if (!items.includes(tabs)) {
        return setItems(
          (item) => (item = tabs === undefined ? [...items] : [...items, tabs]) // 第一次打开页面 tabs 为 undefined
        );
        // return tabs === undefined
        //   ? setItems([...items])
        //   : setItems([...items, tabs]);
      }
    }
  }, [pathname]);

  return (
    <div>
      <Tabs
        activeKey={activeKey}
        type="editable-card"
        items={items}
        hideAdd={true}
        onEdit={onEdit}
        onChange={(e) => {
          tabsIndex.find((item) => {
            if (item.key === e) {
              return navigate(item.path);
            }
          });
        }}
      />
    </div>
  );
}

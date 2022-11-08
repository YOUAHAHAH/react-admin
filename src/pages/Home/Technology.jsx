import React from "react";
import { Card, Typography, Table, Tag } from "antd";
import QueueAnim from "rc-queue-anim";
import "./Technology.less";

const { Link } = Typography;

const columns = [
  {
    dataIndex: "k1",
  },
  {
    dataIndex: "k2",
    render: (text) => <Tag color="processing">{text}</Tag>,
  },
  {
    dataIndex: "k3",
  },
  {
    dataIndex: "k4",
    render: (text) => <Tag color="processing">{text}</Tag>,
  },
];
const data = [
  {
    key: "1",
    k1: "@uiw/react-amap",
    k2: "^4.0.2",
    k3: "antd",
    k4: "^4.23.0",
  },
  {
    key: "2",
    k1: "axios",
    k2: "^0.27.2",
    k3: "dayjs",
    k4: "^0.27.2",
  },
  {
    key: "3",
    k1: "default-passive-events",
    k2: "^2.0.0",
    k3: "echarts",
    k4: "^5.3.3",
  },
  {
    key: "4",
    k1: "echarts-for-react",
    k2: "^3.0.2",
    k3: "immutability-helper",
    k4: "^3.1.1",
  },
  {
    key: "5",
    k1: "less",
    k2: "^4.1.3",
    k3: "less-loader",
    k4: "^11.0.0",
  },
  {
    key: "6",
    k1: "nprogress",
    k2: "^0.2.0",
    k3: "rc-queue-anim",
    k4: "^2.0.0",
  },
  {
    key: "7",
    k1: "less",
    k2: "^4.1.3",
    k3: "less-loader",
    k4: "^11.0.0",
  },
  {
    key: "8",
    k1: "react",
    k2: "^18.2.0",
    k3: "react-bmapgl",
    k4: "^0.2.7",
  },
  {
    key: "9",
    k1: "react-countup",
    k2: "^6.3.1",
    k3: "react-dnd",
    k4: "^16.0.1",
  },
  {
    key: "10",
    k1: "react-dnd-html5-backend",
    k2: "^16.0.1",
    k3: "react-dom",
    k4: "^18.2.0",
  },
  {
    key: "11",
    k1: "react-redux",
    k2: "^8.0.4",
    k3: "react-router-dom",
    k4: "^6.3.0",
  },
  {
    key: "12",
    k1: "redux",
    k2: "^4.2.0",
    k3: "redux-thunk",
    k4: "^2.4.1",
  },
];

const data1 = [
  {
    key: "1",
    k1: "@types/node",
    k2: "^18.7.17",
    k3: "@types/react",
    k4: "^18.0.17",
  },
  {
    key: "2",
    k1: "@types/react-dom",
    k2: "^18.0.6",
    k3: "@vitejs/plugin-react",
    k4: "^2.1.0",
  },
  {
    key: "3",
    k1: "default-passive-events",
    k2: "^2.0.0",
    k3: "echarts",
    k4: "^5.3.3",
  },
  {
    key: "4",
    k1: "@zougt/vite-plugin-theme-preprocessor",
    k2: "^1.4.5",
    k3: "vite",
    k4: "^3.1.0",
  },
];

export default function Technology() {
  return (
    <>
      <QueueAnim
        className="demo-content"
        animConfig={[{ opacity: [1, 0], translateY: [0, 50] }]}
      >
        <div
          key="a"
          style={{
            width: "100%",
            height: "100%",
            border: "1px solid #f0f0f0",
            paddingLeft: " 40px",
            paddingTop: "20px",
          }}
        >
          <b style={{ display: "block", marginBottom: "10px" }}>技术栈</b>
          <ul style={{ fontSize: "18px" }}>
            <li>
              开发工具：
              <Link href="https://code.visualstudio.com/" target="_blank">
                Visual Studio Code
              </Link>
            </li>
            <li>
              编程语言：
              <Link
                href="https://developer.mozilla.org/zh-CN/docs/learn/JavaScript"
                target="_blank"
              >
                JavaScript
              </Link>
            </li>
            <li>
              构建工具：
              <Link href="https://vitejs.cn/" target="_blank">
                Vite 3.x
              </Link>
            </li>
            <li>
              前端框架：
              <Link href="https://react.docschina.org/" target="_blank">
                react 18.x
              </Link>
            </li>
            <li>
              路由工具：
              <Link
                href="https://serializedowen.github.io/docs/react-router-dom/%E5%90%91%E5%AF%BC/%E5%BF%AB%E9%80%9F%E5%BC%80%E5%A7%8B"
                target="_blank"
              >
                react-router-dom 6.x
              </Link>
            </li>
            <li>
              状态管理：
              <Link
                href="https://www.redux.org.cn/docs/react-redux/"
                target="_blank"
              >
                react-redux 8.x
              </Link>
            </li>
            <li>
              UI 框架：
              <Link
                href="https://ant-design.gitee.io/docs/react/introduce-cn"
                target="_blank"
              >
                antd 4.x
              </Link>
            </li>
            <li>
              CSS 预编译：
              <Link href="https://less.bootcss.com/" target="_blank">
                less 4.x
              </Link>
            </li>
          </ul>
        </div>

        <Card
          className="TecCard"
          key="b"
          title="生产环境依赖"
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Table
            columns={columns}
            pagination={false}
            dataSource={data}
            showHeader={false}
            bordered
          />
        </Card>

        <Card
          className="TecCard"
          key="c"
          title="开发环境依赖"
          style={{
            width: "100%",
            marginTop: "20px",
          }}
        >
          <Table
            columns={columns}
            pagination={false}
            dataSource={data1}
            showHeader={false}
            bordered
          />
        </Card>
      </QueueAnim>
    </>
  );
}

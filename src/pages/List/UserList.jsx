import React, { useEffect, useState, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Space,
  Table,
  Switch,
  message,
  Button,
  Drawer,
  Spin,
  Tooltip,
  Popconfirm,
} from "antd";
import {
  SettingOutlined,
  EditOutlined,
  DeleteOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import QueueAnim from "rc-queue-anim";
import { userTableList, userState, userDelete } from "../../api/api";
import DropTable from "../../components/Drop/DropTable";
import UserForm from "../../components/Form/UserForm";
import ViewUserList from "../../components/ViewCode/UserList.jsx";

export default function UserList() {
  const usertoken = useSelector((state) => {
    return state.userToken;
  });
  const FormRef = useRef();
  const [loading, setLoading] = useState(true);
  const [dataSource, setDateSource] = useState([]);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "用户名",
      dataIndex: "username",
      key: "username",
    },
    {
      id: 2,
      title: "用户权限",
      dataIndex: "posts",
      key: "posts",
    },
    {
      id: 3,
      title: "状态",
      dataIndex: "state",
      key: "state",
      render: (_, record) => {
        return (
          <Space size="middle">
            <Switch
              checkedChildren="已开启"
              unCheckedChildren="已关闭"
              // defaultChecked={record.state === "1" ? true : false}
              checked={record.state === "1" ? true : false}
              onChange={() => {
                onChange(record.id, record.state, record.token);
              }}
            />
          </Space>
        );
      },
    },
    {
      id: 4,
      title: "创建时间",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <>{dayjs(record.date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
    },
    {
      id: 5,
      title: "操作",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              EditHandle(record.id, record.token);
            }}
          >
            <EditOutlined />
            编辑
          </a>
          <a style={{ color: "red" }}>
            {record.token === token ? (
              <Popconfirm
                title="你确认要删除此用户吗?"
                onConfirm={() => {
                  confirm(record.id);
                }}
                onCancel={() => {
                  message.success("取消成功！");
                }}
                okText="Yes"
                cancelText="No"
              >
                <DeleteOutlined />
                删除
              </Popconfirm>
            ) : (
              <span
                onClick={() => {
                  message.warning("不能删除其他用户！");
                }}
              >
                <DeleteOutlined />
                删除
              </span>
            )}
          </a>
        </Space>
      ),
    },
  ]);
  const [open, setOpen] = useState(false);
  const [num, setNum] = useState(1);
  const [userFormId, setUserFormId] = useState();
  const [token, setToken] = useState();

  // 处理返回的 res 数据
  const apiUser = (res) => {
    setLoading(true);
    const { code, data, msg, total, num, count } = res;
    if (code === 200) {
      total ? setPagination({ total, pageSize: count, current: num }) : "";
      data ? setDateSource((dateSource) => (dateSource = data)) : "";
      setLoading(false);
    } else {
      message.error(msg);
    }
  };

  // api请求
  const getUserTable = (current, pageSize) => {
    userTableList({ num: current, count: pageSize }).then((res) => {
      apiUser(res);
    });
  };

  // 分页
  const pageChange = (arg) => {
    getUserTable(arg.current, arg.pageSize);
  };

  // 改变用户状态
  const onChange = (id, state, token) => {
    if (token === usertoken) {
      userState({ id, state }).then((res) => {
        apiUser(res);
        setNum((num) => (num += 1));
      });
    } else {
      message.warn("只能修改自己的状态！");
    }
    // msessage.error("您的权限不够，无法更改！");
  };

  // 编辑
  const EditHandle = (id, token) => {
    FormRef.current.editUserForm();
    setUserFormId(id);
    setToken(token);
  };

  // 删除
  const confirm = (id) => {
    userDelete({ id }).then((res) => {
      apiUser(res);
      setNum((num) => (num += 1));
    });
    // message.error("您的权限不够，无法删除！");
  };

  //添加
  const addHandle = () => {
    FormRef.current.addUserForm();
    setUserFormId();
  };

  // 控制(编辑、添加)后更新
  const changeNum = (formNum) => {
    setNum((num) => (num += formNum));
  };

  // 改变表格表头
  const getDropData = (data) => {
    setColumns(data);
  };

  useEffect(() => {
    getUserTable(pagination.current, pagination.pageSize);
  }, [num]);

  return (
    <>
      <div style={{ marginBottom: "15px" }}>
        <div
          style={{
            display: "flex",
            flexDirection: " row-reverse",
            marginBottom: "10px",
            position: "absolute",
            right: "25px",
            top: "3px",
          }}
        >
          <Tooltip placement="left" title={<span>列设置</span>}>
            <Button
              type="dashed"
              shape="circle"
              onClick={() => {
                setOpen(true);
              }}
              icon={<SettingOutlined />}
            />
          </Tooltip>
        </div>

        <Drawer
          title="表格表头设置"
          placement="right"
          onClose={() => {
            setOpen(false);
          }}
          open={open}
        >
          <DropTable columns={columns} getDropData={getDropData} />
        </Drawer>

        <ViewUserList />
      </div>

      <QueueAnim type={["right", "left"]} className="demo-content">
        <div
          key="header"
          style={{
            display: "flex",
            justifyContent: "space-between",
            marginBottom: "20px",
          }}
        >
          <h4>角色列表</h4>

          <Button type="primary" icon={<UserAddOutlined />} onClick={addHandle}>
            添加用户
          </Button>
        </div>
      </QueueAnim>

      <Spin
        size="large"
        spinning={loading}
        style={{ textAlign: "center", width: "100%" }}
        delay={300}
        tip="加载中···"
      >
        <QueueAnim type={["right", "left"]} className="demo-content">
          <Table
            key="page"
            dataSource={loading ? "" : dataSource}
            columns={columns}
            rowKey={(item) => {
              return item.id;
            }}
            pagination={{
              pagination,
              showSizeChanger: true,
              pageSizeOptions: [5, 15, 50, 100],
              total: pagination.total,
              defaultPageSize: 5,
              scrollToFirstRowOnChange: true,
            }}
            onChange={pageChange}
          />
        </QueueAnim>
      </Spin>

      <UserForm
        FormRef={FormRef}
        userFormId={userFormId}
        token={token}
        changeNum={changeNum}
      />
    </>
  );
}

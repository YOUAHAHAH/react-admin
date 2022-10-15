import React, { useEffect, useState, Fragment, useRef } from "react";
import {
  Form,
  Input,
  Table,
  Tag,
  Space,
  message,
  Popconfirm,
  Button,
  notification,
  Switch,
  Drawer,
  Spin,
  Tooltip,
} from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FolderAddOutlined,
  Loading3QuartersOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import dayjs from "dayjs";
import QueueAnim from "rc-queue-anim";
import { tableList, searchTableList, delTableList } from "../../api/api";
import "./Less/SearchList.less";
import ViewSearchList from "../../components/ViewCode/SearchList";
import TableForm from "../../components/Form/TableForm";
import DropTable from "../../components/Drop/DropTable";

const colorArr = [
  "magenta",
  "red",
  "volcano",
  "orange",
  "gold",
  "lime",
  "cyan",
  "blue",
  "geekblue",
];

export default function SearchList() {
  const FormRef = useRef();
  const [loading, setLoading] = useState(true);
  const [getChecked, setGetChecked] = useState("id");
  const [datas, setDates] = useState([]);
  const [pagState, setPagState] = useState(1);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [searchPagination, setSearchPagination] = useState({
    current: 1,
    pageSize: 5,
    total: 0,
  });
  const [state, setState] = useState();
  const [editId, setEditId] = useState();
  const [num, setNum] = useState(1);
  const [form] = Form.useForm();
  const [formValue, setFormValue] = useState();
  const [columns, setColumns] = useState([
    {
      id: 1,
      title: "消息ID",
      dataIndex: "id",
      key: "id",
    },
    {
      id: 2,
      title: "消息标题",
      dataIndex: "title",
      key: "title",
    },
    {
      id: 3,
      title: "消息内容",
      dataIndex: "content",
      key: "content",
    },
    {
      id: 4,
      title: "标签",
      dataIndex: "tags",
      key: "tags",
      render: (tags, _) => (
        <Fragment>
          {tags.split(",").map((tag, index) => {
            return (
              <Tag
                color={colorArr[Math.floor(Math.random() * colorArr.length)]}
                key={index}
              >
                {tag}
              </Tag>
            );
          })}
        </Fragment>
      ),
    },
    {
      id: 5,
      title: "最近更新时间",
      dataIndex: "date",
      key: "date",
      render: (_, record) => (
        <>{dayjs(record.date).format("YYYY-MM-DD HH:mm:ss")}</>
      ),
    },
    {
      id: 6,
      title: "操作",
      dataIndex: "edit",
      key: "edit",
      render: (_, record) => (
        <Space size="middle">
          <a
            onClick={() => {
              EditHandle(record.id);
            }}
          >
            <EditOutlined />
            编辑
          </a>
          <Popconfirm
            title="你确认要删除此列表吗?"
            onConfirm={() => {
              confirm(record.id);
            }}
            onCancel={() => {
              message.success("取消成功！");
            }}
            okText="Yes"
            cancelText="No"
          >
            <a style={{ color: "red" }}>
              <DeleteOutlined />
              删除
            </a>
          </Popconfirm>
        </Space>
      ),
    },
  ]);
  const [open, setOpen] = useState(false);

  // 处理数据
  const apiData = (data, state) => {
    let newArr = JSON.parse(JSON.stringify(data));
    let myArr = [];
    newArr.map((item) => {
      let obj = {
        id: item.id,
        date: item.date,
        title: item.title,
        content: item.content,
        tags: item.tags,
      };
      myArr.push(obj);
    });
    setLoading(false);
    setPagState(state);
    setDates((item) => (item = myArr));
  };

  //
  const getTableList = (current, pageSize, checked) => {
    setLoading(true);
    tableList({ num: current, count: pageSize, checked }).then((res) => {
      const { code, data, total, num, count } = res;
      if (code === 200) {
        apiData(data, 1);
        setPagination({ total, pageSize: count, current: num });
      } else {
        message.error(msg);
      }
    });
  };

  // 搜索
  const getSearchTableList = (values, current, pageSize, checked) => {
    setLoading(true);
    searchTableList({
      values,
      num: current,
      count: pageSize,
      checked,
    }).then((res) => {
      const { code, data, total, count, num } = res;
      if (code === 200) {
        apiData(data, 2);
        setSearchPagination({ total, pageSize: count, current: num });
      } else {
        message.error("请检测网络！");
      }
    });
  };

  // 分页查询
  const pageChange = (arg) => {
    if (pagState === 1) {
      return getTableList(arg.current, arg.pageSize, getChecked);
    } else if (pagState === 2) {
      return getSearchTableList(
        formValue,
        arg.current,
        arg.pageSize,
        getChecked
      );
    }
  };

  // 删除
  const confirm = (id) => {
    delTableList({ id }).then((res) => {
      let { code, msg } = res;
      if (code === 200) {
        message.success(msg);
        setNum((num) => num + 1);
      } else {
        message.error(msg);
      }
    });
    // message.error("您的权限不够，无法删除！");
  };

  // 添加
  const AddHandle = () => {
    FormRef.current.AddModalForm(); // 获取子组件上 AddModalForm 方法
    setState(1);
  };

  // 编辑
  const EditHandle = (id) => {
    FormRef.current.AddModalForm(); // 获取子组件上 EditModalForm 方法
    setState(2);
    setEditId((Editid) => (Editid = id));
  };

  // 搜索查询
  const onFinish = (values) => {
    console.log(values);
    // if (!values.content && !values.title) {
    //   return notification.error({
    //     message: "搜索的标题或内容不能为空",
    //     placement: "topLeft",
    //     duration: 2,
    //   });
    // }
    // setFormValue(values);
    // getSearchTableList(
    //   values,
    //   searchPagination.current,
    //   searchPagination.pageSize,
    //   getChecked
    // );
  };

  // 提交控制setNum进行更新
  const changeNum = (FromNum) => {
    setNum((num) => (num += FromNum));
  };

  // 时间排序
  const onChange = (checked) => {
    if (checked) {
      setGetChecked("date");
      if (pagState === 1) {
        getTableList(pagination.current, pagination.pageSize, "date");
      } else {
        getSearchTableList(
          formValue,
          searchPagination.current,
          searchPagination.pageSize,
          "date"
        );
      }
    } else {
      setGetChecked("id");
      if (pagState === 1) {
        getTableList(pagination.current, pagination.pageSize, "id");
      } else {
        getSearchTableList(
          formValue,
          searchPagination.current,
          searchPagination.pageSize,
          "id"
        );
      }
    }
  };

  // 改变表格表头
  const getDropData = (data) => {
    setColumns(data);
  };

  useEffect(() => {
    getTableList(pagination.current, pagination.pageSize, getChecked);
  }, [num]);

  return (
    <>
      <QueueAnim
        type={["right", "left"]}
        className="demo-content"
        style={{ marginTop: "-13px" }}
      >
        <div className="search" key="header">
          <Form
            name="basic"
            form={form}
            onFinish={onFinish}
            autoComplete="off"
            key="a"
          >
            <Form.Item name="title">
              <Input placeholder="输入消息标题" />
            </Form.Item>
            <Form.Item name="content">
              <Input placeholder="输入消息内容" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                style={{ marginRight: "10px" }}
              >
                搜索
              </Button>
              {/* <Button
                htmlType="submit"
                onClick={() => {
                  location.reload();
                }}
              >
                清空并刷新
                <Loading3QuartersOutlined />
              </Button> */}
            </Form.Item>
          </Form>

          <Tooltip placement="left" title={<span>列设置</span>} key="b">
            <Button
              type="dashed"
              shape="circle"
              onClick={() => {
                setOpen(true);
              }}
              icon={<SettingOutlined />}
              style={{ position: "absolute", right: "30px", top: "10px" }}
            />
          </Tooltip>

          <Drawer
            title="表格表头设置"
            placement="right"
            onClose={() => {
              setOpen(false);
            }}
            open={open}
            key="c"
          >
            <DropTable columns={columns} getDropData={getDropData} />
          </Drawer>

          <ViewSearchList />
        </div>
      </QueueAnim>

      <TableForm
        FormRef={FormRef}
        changeNum={changeNum}
        state={state}
        formData={datas}
        editId={editId}
      />

      <QueueAnim type={["right", "left"]} className="demo-content">
        <div className="table-add" key="banner">
          <div>
            <span style={{ marginRight: "10px" }}>表格查询</span>
            <div style={{ display: "inline-block" }}>
              <Switch defaultChecked={false} onChange={onChange} />
              <span style={{ marginLeft: "5px" }}>时间排序</span>
            </div>
          </div>
          <Button
            type="primary"
            icon={<FolderAddOutlined />}
            onClick={AddHandle}
          >
            添加消息
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
            dataSource={loading ? "" : datas}
            columns={columns}
            rowKey={(item) => {
              // item 为dataSource 绑定的数据+map 返回的值
              // 每一行和每一列都需要设置特定的key rowKey可以动态给表单添加key，但return返回的key必须是稳定唯一的key
              return item.id;
            }}
            pagination={
              pagState === 1
                ? {
                    pagination,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 15, 50, 100],
                    total: pagination.total,
                    defaultPageSize: 5,
                    scrollToFirstRowOnChange: true,
                  }
                : {
                    searchPagination,
                    showSizeChanger: true,
                    pageSizeOptions: [5, 15, 50, 100],
                    total: searchPagination.total,
                    defaultPageSize: 5,
                    scrollToFirstRowOnChange: true,
                  }
            }
            onChange={pageChange}
          ></Table>
        </QueueAnim>
      </Spin>
    </>
  );
}

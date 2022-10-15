import React, { useEffect, useState, useRef } from "react";
import { Card, Avatar, Col, Row, message, Popconfirm, Spin } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  FileAddOutlined,
} from "@ant-design/icons";
import "./Less/CardList.less";
import { cardList, delCardList } from "../../api/api.js";
import ViewCadrList from "../../components/ViewCode/CardList.jsx";
import TableForm from "../../components/Form/TableForm";

const { Meta } = Card;

export default function CardList() {
  const FormRef = useRef();
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [state, setState] = useState();
  const [formData, setFormData] = useState({});
  const [num, setNum] = useState(1);

  // 新增
  const AddCardHandleForm = () => {
    FormRef.current.AddCardModalForm(); // 获取子组件上 AddModalForm 方法
    setState(3);
    setFormData({});
  };

  // 单个卡片删除
  const confirm = (id) => {
    delCardList({ id }).then((res) => {
      let { code, msg } = res;
      if (code === 200) {
        setNum(num + 1);
        message.success(msg, 2);
      } else {
        message.error(msg);
      }
    });
    // message.error("您的权限不够，无法删除！");
  };

  // 查询
  const getCardList = () => {
    cardList().then((res) => {
      const { code, data } = res;
      if (code === 200) {
        setLoading(false);
        setList(data);
      } else {
        message.error(msg);
      }
    });
  };

  const changeNum = (FromNum) => {
    setNum((num) => (num += FromNum));
  };

  useEffect(() => {
    getCardList();
  }, [num]);

  return (
    <>
      <ViewCadrList />

      <TableForm FormRef={FormRef} changeNum={changeNum} state={state} />

      <Spin
        size="large"
        spinning={loading}
        style={{ textAlign: "center", width: "100%" }}
        delay={300}
        tip="加载中···"
      >
        <Row gutter={24} style={{ display: loading ? "none" : "flex" }}>
          <Col span={6}>
            <Card
              hoverable={true}
              style={{ width: "100%", height: "201px" }}
              onClick={AddCardHandleForm}
            >
              <div className="add">
                <FileAddOutlined />
                <h4>新增</h4>
              </div>
            </Card>
          </Col>
          {list.map((item) => {
            return (
              <Col span={6} key={item.id}>
                <Card
                  style={{ width: "100%" }}
                  actions={[
                    <EditOutlined
                      key="edit"
                      onClick={() => {
                        message.error("您的权限不够，无法编辑！");
                      }}
                    />,
                    <Popconfirm
                      title="你确认要删除此卡片吗?"
                      onConfirm={() => {
                        confirm(item.id);
                      }}
                      onCancel={() => {
                        message.success("取消成功！");
                      }}
                      okText="Yes"
                      cancelText="No"
                    >
                      <DeleteOutlined key="delete" />
                    </Popconfirm>,
                  ]}
                  hoverable={true}
                >
                  <Meta
                    key={item.id}
                    avatar={<Avatar src={item.PicUrl} />}
                    title={item.title}
                    description={item.content}
                  />
                </Card>
              </Col>
            );
          })}
        </Row>
      </Spin>
    </>
  );
}

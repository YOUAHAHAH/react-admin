import React, { useEffect, useState } from "react";
import { Button, List, message, Skeleton, Modal, Spin, Popconfirm } from "antd";
import dayjs from "dayjs";
import { connect } from "react-redux";
import { createMessageAsync } from "../../store/actions/Message";
import {
  unreadMessages,
  TaggedMessage,
  receivedReadMessage,
  markingForDeletion,
  recyclingStation,
  restoreMessage,
  deleteMessage,
  selectMessage,
  dAllMessage,
} from "../../api/api";
import "./Message.less";

const RecyclingStation = (props) => {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const [state, setState] = useState(props.state);
  const [num, setNum] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalData, setModalData] = useState({});

  // 处理请求数据
  const msgApi = (res) => {
    setLoading(true);
    const { code, data, msg, uM, rM, rsM } = res;
    if (code === 200) {
      props.UnreadMessage(uM);
      props.ReceivedReadMessage(rM);
      props.RecyclingStation(rsM);
      setTimeout(() => {
        setLoading(false);
        setList(data);
      }, 500);
    } else {
      message.error(msg);
    }
  };

  // 操作处理
  const stateApi = (res) => {
    const { code, msg } = res;
    if (code === 200) {
      message.success(msg);
      setNum((num) => num + 1);
    } else {
      message.error(msg);
    }
  };

  // 标记已读
  const UnreadM = (id) => {
    TaggedMessage({ id }).then((res) => {
      stateApi(res);
      props.getMessage(); // redux 未读消息个数
    });
  };

  // 标记删除
  const ReceivedReadM = (id) => {
    markingForDeletion({ id }).then((res) => {
      stateApi(res);
    });
  };

  // 还原
  const Restore = (id) => {
    restoreMessage({ id }).then((res) => {
      stateApi(res);
    });
  };

  // 彻底删除
  const Delete = (id) => {
    deleteMessage({ id }).then((res) => {
      stateApi(res);
    });
  };

  // 查看消息
  const selectM = (id) => {
    selectMessage({ id }).then((res) => {
      const { code, data, msg } = res;
      if (code === 200) {
        setModalData(data);
        setIsModalOpen(true);
      } else {
        message.error(msg);
      }
    });
  };

  // 清空消息 - 全部删除 - 清空回收站
  const confirm = () => {
    dAllMessage({ state }).then((res) => {
      const { code, msg } = res;
      if (code === 200) {
        message.success(msg);
        setNum((num) => num + 1);
        props.getMessage(); // redux 未读消息个数
      } else {
        message.error(msg);
      }
    });
  };

  useEffect(() => {
    if (props.state === 1) {
      unreadMessages().then((res) => {
        msgApi(res);
      });
    } else if (props.state === 2) {
      receivedReadMessage().then((res) => {
        msgApi(res);
      });
    } else if (props.state === 3) {
      recyclingStation().then((res) => {
        msgApi(res);
      });
    }
  }, [num, props.state]);

  return (
    <>
      <Spin
        size="large"
        spinning={loading}
        style={{ textAlign: "center", width: "100%" }}
        tip="加载中···"
      >
        <List
          itemLayout="horizontal"
          dataSource={list}
          renderItem={(item) => (
            <List.Item
              actions={[
                state === 1 ? (
                  <Button
                    type="primary"
                    onClick={() => {
                      UnreadM(item.id);
                    }}
                  >
                    标记已读
                  </Button>
                ) : state === 2 ? (
                  <Button
                    type="primary"
                    danger
                    onClick={() => {
                      ReceivedReadM(item.id);
                    }}
                  >
                    标记删除
                  </Button>
                ) : (
                  <>
                    <Button
                      style={{ marginRight: "5px" }}
                      type="primary"
                      onClick={() => {
                        Restore(item.id);
                      }}
                    >
                      还原
                    </Button>
                    <Button
                      type="primary"
                      danger
                      onClick={() => {
                        Delete(item.id);
                      }}
                    >
                      彻底删除
                    </Button>
                  </>
                ),
              ]}
            >
              <Skeleton title={false} loading={item.loading} active>
                <List.Item.Meta
                  title={item.title}
                  description={item.message}
                  onClick={() => {
                    selectM(item.id);
                  }}
                  style={{
                    cursor: "pointer",
                  }}
                />
                <div>{dayjs(item.date * 1).format("YYYY-MM-DD HH:mm:ss")}</div>
              </Skeleton>
            </List.Item>
          )}
        />
        <Popconfirm
          title={
            state === 1
              ? "您确定清空消息吗？"
              : state === 2
              ? "您确定全部删除吗？"
              : "您确定清空回收站吗？"
          }
          onConfirm={confirm}
          onCancel={() => {
            message.success("取消成功！");
          }}
          okText="Yes"
          cancelText="No"
        >
          <Button
            type="primary"
            danger={state === 1 ? false : true}
            style={{ margin: "10px", display: list.length ? "" : "none" }}
          >
            {state === 1 ? "清空消息" : state === 2 ? "全部删除" : "清空回收站"}
          </Button>
        </Popconfirm>
      </Spin>
      <Modal
        title={
          <div className="modalData">
            <span>{`标题：${modalData.title}`}</span>
            <span>{`描述：${modalData.content}`}</span>
          </div>
        }
        open={isModalOpen}
        onOk={() => {
          setIsModalOpen(false);
        }}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        footer={[
          <Button
            key="back"
            type="primary"
            onClick={() => {
              setIsModalOpen(false);
            }}
          >
            关闭
          </Button>,
        ]}
      >
        <div>{modalData.message}</div>
        <p style={{ float: "right", fontSize: "12px" }}>{`发布时间：${dayjs(
          modalData.date * 1
        ).format("YYYY-MM-DD HH:mm:ss")}`}</p>
      </Modal>
    </>
  );
};

export default connect(null, {
  getMessage: createMessageAsync,
})(RecyclingStation);

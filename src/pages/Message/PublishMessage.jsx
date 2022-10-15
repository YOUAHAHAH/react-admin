import React, { useState, useEffect, useRef } from "react";
import { Button, DatePicker, Form, Input, message, TreeSelect } from "antd";
import QueueAnim from "rc-queue-anim";
import { serachMessageUser, publicMessage } from "../../api/api";

const { SHOW_PARENT } = TreeSelect;

const layout = {
  wrapperCol: {
    span: 10,
  },
  labelCol: {
    span: 8,
  },
};

export default function PublishMessage() {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [value, setValue] = useState([]);
  const [treeD, setTreeD] = useState([]);
  const [treePosts, setTreePosts] = useState();

  const onChange = (newValue) => {
    setValue(newValue);
  };

  const publicM = () => {
    form.validateFields().then((values) => {
      publicMessage({ values, treePosts }).then((res) => {
        const { code, msg } = res;
        if (code === 200) {
          message.success(msg);
          form.resetFields();
        } else {
          message.error(msg);
        }
      });
    });
  };

  useEffect(() => {
    serachMessageUser().then((res) => {
      const treeData = [];
      const { code, data } = res;
      if (code === 200) {
        const arr = data.map((item) => item.posts);
        const newArr = arr.filter((item, index) => arr.indexOf(item) === index);
        newArr.map((item, index) => {
          const children = [];
          data
            .filter((items) => items.posts === item)
            .map((i, n) => {
              const childrenObj = {
                title: i.username,
                value: `0-${index}-${n}`,
                key: `0-${index}-${n}`,
              };
              children.push(childrenObj);
            });
          const obj = {
            title: item,
            value: `0-${index}`,
            key: `0-${index}`,
            children: [...children],
          };
          treeData.push(obj);
        });
      }
      setTreeD(treeData);
    });
  }, []);

  const tProps = {
    treeData: treeD,
    value,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: "请选择消息对象(默认为全体用户)",
    style: {
      width: "100%",
    },
  };

  return (
    <QueueAnim type={["right", "left"]} className="demo-content">
      <div key="form">
        <Form
          name="time_related_controls"
          {...layout}
          ref={formRef}
          form={form}
        >
          <Form.Item
            label="消息标题"
            name="MessageTitle"
            rules={[
              {
                required: true,
                message: "请输入消息标题!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="消息描述"
            name="MessageContent"
            rules={[
              {
                required: true,
                message: "请输入消息描述!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="消息内容"
            name="Message"
            rules={[
              {
                required: true,
                message: "请输入消息内容!",
              },
            ]}
          >
            <Input.TextArea />
          </Form.Item>
          <Form.Item
            name="dateTime"
            label="发布时间"
            rules={[
              {
                type: "object",
                required: true,
                message: "请输入发布时间!",
              },
            ]}
          >
            <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" />
          </Form.Item>
          <Form.Item label="消息对象" name="MessageUser">
            <TreeSelect
              {...tProps}
              onChange={(newValue, v2) => {
                setValue(newValue);
                setTreePosts(v2);
              }}
            />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
            }}
          >
            <Button type="primary" onClick={publicM}>
              发布
            </Button>
          </Form.Item>
        </Form>
      </div>
    </QueueAnim>
  );
}

import React, { useState, useImperativeHandle, useEffect, useRef } from "react";
import { Modal, Form, Input, Alert, message } from "antd";
import { addTableList, editTableList, addCardList } from "../../api/api";

export default function TableForm(props) {
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [ModalFormVisible, setModalFormVisibleVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [editData, setEditData] = useState();
  const { FormRef, changeNum } = props;

  const apiForm = (code, msg) => {
    if (code === 200) {
      setConfirmLoading(false);
      setModalFormVisibleVisible(false);
      message.success(msg);
      changeNum(1); // 父组件函数传参
    } else {
      message.error(msg);
    }
  };

  const handleOk = () => {
    if (props.state === 1) {
      form.validateFields().then((values) => {
        setConfirmLoading(true);
        addTableList(values).then((res) => {
          const { code, msg } = res;
          apiForm(code, msg);
        });
        // message.error("您的权限不够，无法添加！");
      });
    } else if (props.state === 2) {
      form.validateFields().then((values) => {
        setConfirmLoading(true);
        editTableList({ values, id: props.editId }).then((res) => {
          const { code, msg } = res;
          apiForm(code, msg);
        });
        // message.error("您的权限不够，无法编辑！");
      });
    } else if (props.state === 3) {
      form.validateFields().then((values) => {
        setConfirmLoading(true);
        addCardList(values).then((res) => {
          const { code, msg } = res;
          apiForm(code, msg);
        });
        // message.error("您的权限不够，无法添加！");
      });
    }
  };

  useImperativeHandle(FormRef, () => ({
    // AddModalForm、EditModalForm 暴露给父组件的方法
    AddModalForm: (ModalFormVisible) => {
      setModalFormVisibleVisible(!ModalFormVisible);
    },
    EditModalForm: (ModalFormVisible) => {
      setModalFormVisibleVisible(!ModalFormVisible);
    },
    AddCardModalForm: (ModalFormVisible) => {
      setModalFormVisibleVisible(!ModalFormVisible);
    },
  }));

  useEffect(() => {
    props.formData &&
      props.formData.map((item) => {
        if (item.id === props.editId) {
          setEditData((data) => (data = item));
        }
      });
  });

  useEffect(() => {
    // 先判断from组件是否渲染，再进行表单重置
    if (formRef.current) {
      form.resetFields();
    }
  }, [editData]);

  return (
    <div>
      <Modal
        title={props.state !== 2 ? "添加列表" : "编辑列表"}
        open={ModalFormVisible}
        confirmLoading={confirmLoading}
        onCancel={() => {
          setModalFormVisibleVisible(false);
        }}
        onOk={handleOk}
        cancelText="取消"
        okText={props.state === 1 ? "添加" : "提交"}
      >
        <Form
          ref={formRef}
          form={form}
          name="basic"
          autoComplete="off"
          initialValues={
            editData === undefined
              ? ""
              : {
                  title: editData.title,
                  content: editData.content,
                  tags: editData.tags,
                }
          }
        >
          <Form.Item
            name="title"
            label={props.state !== 3 ? "消息标题" : "图片链接"}
            rules={[
              {
                required: true,
                message:
                  props.state !== 3 ? "请输入消息标题" : "请输入图片链接",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="content"
            label={props.state !== 3 ? "消息内容" : "标题"}
            rules={[
              {
                required: true,
                message:
                  props.state !== 3 ? "请输入消息内容" : "请输入图片标题",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Form.Item
            name="tags"
            label={props.state !== 3 ? "标签" : "描述"}
            rules={[
              {
                required: true,
                message:
                  props.state !== 3 ? "请输入消息标签" : "请输入图片描述",
              },
            ]}
          >
            <Input autoComplete="off" />
          </Form.Item>
          <Alert
            message="不同标签之间用英文逗号隔开！"
            type="warning"
            showIcon
            style={{ display: props.state !== 3 ? "flex" : "none" }}
          />
        </Form>
      </Modal>
    </div>
  );
}

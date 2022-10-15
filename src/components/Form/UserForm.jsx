import React, { useState, useImperativeHandle, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import {
  Form,
  Input,
  message,
  Button,
  Drawer,
  Select,
  Space,
  Divider,
  Spin,
  Radio,
  Upload,
} from "antd";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { userEditId, userEdit, userAdd } from "../../api/api";
import getToken from "../../utils/getToken";

const { Option } = Select;
const { TextArea } = Input;

// 图片格式转化
const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};
// 上传图片格式判断和大小限制
const beforeUpload = (file) => {
  const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
  if (!isJpgOrPng) {
    message.error("You can only upload JPG/PNG file!");
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error("Image must smaller than 2MB!");
  }
  return isJpgOrPng && isLt2M;
};

export default function UserForm(props) {
  const usertoken = useSelector((state) => {
    return state.userToken;
  });
  const formRef = useRef(null);
  const inputRef = useRef(null);
  const [form] = Form.useForm();
  const [loadingDrawer, setLoadingDrawer] = useState(true);
  const [ModalFormVisible, setModalFormVisibleVisible] = useState(false);
  const [items, setItems] = useState(["管理员", "用户", "游客"]);
  const [name, setName] = useState();
  const [formData, setFormData] = useState({});
  const { FormRef, userFormId, changeNum, token } = props;

  // 图片上传
  const [loading, setLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState();

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setLoading(false);
        setImageUrl(url);
      });
    }
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );

  //
  const onNameChange = (event) => {
    setName(event.target.value);
  };

  // 权限改变
  const addItem = (e) => {
    e.preventDefault();
    setItems([...items, name || `New item ${index++}`]);
    setName("");
    setTimeout(() => {
      inputRef.current?.focus();
    }, 0);
  };

  // 编辑
  const editForm = (id) => {
    form.validateFields().then((values) => {
      userEdit({ values, id }).then((res) => {
        const { code, msg } = res;
        if (code === 200) {
          setModalFormVisibleVisible(false);
          message.success(msg);
          changeNum(1); // 父组件函数传参
        } else {
          message.error(msg);
        }
      });
      // message.error("您的权限不够，无法编辑！");
    });
  };

  // 添加
  const addForm = () => {
    form.validateFields().then((values) => {
      userAdd({ values }).then((res) => {
        const { code, msg } = res;
        if (code === 200) {
          setModalFormVisibleVisible(false);
          message.success(msg);
          changeNum(1); // 父组件函数传参
        } else {
          message.error(msg);
        }
      });
      // message.error("您的权限不够，无法添加！");
    });
  };

  useImperativeHandle(FormRef, () => ({
    // editUserForm 暴露给父组件的方法
    editUserForm: (ModalFormVisible) => {
      setModalFormVisibleVisible(!ModalFormVisible);
    },
    addUserForm: (ModalFormVisible) => {
      setModalFormVisibleVisible(!ModalFormVisible);
    },
  }));

  useEffect(() => {
    if (userFormId) {
      setLoadingDrawer(true);
      userEditId({ id: userFormId }).then((res) => {
        const { code, data } = res;
        if (code === 200) {
          setFormData(data);
          setLoadingDrawer(false);
        }
      });
    } else {
      setFormData({});
      setLoadingDrawer(false);
    }
    setImageUrl();
  }, [ModalFormVisible]);

  useEffect(() => {
    // 先判断from组件是否渲染，再进行表单重置
    if (formRef.current) {
      form.resetFields();
    }
  }, [formData]);

  // 判断是否为 不可用状态
  const getUserFormId = () => {
    return token ? (usertoken === token ? false : true) : false;
  };

  return (
    <>
      <Drawer
        title={token ? "编辑用户" : "添加用户"}
        width={400}
        onClose={() => {
          setModalFormVisibleVisible(false);
        }}
        open={ModalFormVisible}
        footer={
          <Space style={{ float: "right" }}>
            <Button
              onClick={() => {
                setModalFormVisibleVisible(false);
              }}
            >
              取消
            </Button>
            <Button
              disabled={getUserFormId()}
              onClick={() => {
                if (userFormId) {
                  editForm(userFormId);
                } else {
                  addForm();
                }
              }}
              type="primary"
            >
              {token ? "编辑" : "添加"}
            </Button>
          </Space>
        }
      >
        <Spin
          size="large"
          spinning={loadingDrawer}
          style={{ textAlign: "center", width: "100%" }}
          delay={300}
          tip="加载中···"
        >
          <Form
            ref={formRef}
            form={form}
            name="basic"
            onFinish={() => {
              setModalFormVisibleVisible(false);
            }}
            onFinishFailed={() => {
              setModalFormVisibleVisible(false);
            }}
            autoComplete="off"
            initialValues={
              formData
                ? {
                    username: formData.username,
                    password: formData.password,
                    email: formData.email,
                    posts: formData.posts,
                    state: formData.state,
                    note: formData.note,
                  }
                : ""
            }
          >
            <Form.Item
              label="用户名"
              name="username"
              rules={[
                {
                  required: true,
                  message: "请输入用户名!",
                },
              ]}
            >
              <Input
                allowClear
                autoComplete="true"
                disabled={getUserFormId()}
              />
            </Form.Item>
            <Form.Item
              label="密码"
              name="password"
              rules={[
                {
                  required: true,
                  message: "请输入密码!",
                },
              ]}
            >
              <Input.Password
                allowClear
                disabled={getUserFormId()}
                autoComplete="true"
              />
            </Form.Item>
            <Form.Item
              label="邮箱"
              name="email"
              rules={[
                {
                  required: true,
                  message: "请输入邮箱!",
                },
                {
                  pattern: new RegExp(
                    /^([a-zA-Z0-9])+(([a-zA-Z0-9])|([._-][a-zA-Z0-9])*)+@([a-zA-Z0-9-])+((\.[a-zA-Z0-9-]{2,3}){1,2})$/,
                    "g"
                  ),
                  message: "请输入正确的邮箱格式",
                },
              ]}
            >
              <Input
                type="email"
                allowClear
                autoComplete="true"
                disabled={getUserFormId()}
              />
            </Form.Item>
            <Form.Item
              label="用户权限"
              name="posts"
              rules={[
                {
                  required: true,
                  message: "请选择用户权限!",
                },
              ]}
            >
              <Select
                disabled={getUserFormId()}
                dropdownRender={(menu) => (
                  <>
                    {menu}
                    <Divider
                      style={{
                        margin: "8px 0",
                      }}
                    />
                    <Space
                      style={{
                        padding: "0 8px 4px",
                      }}
                    >
                      <Input
                        ref={inputRef}
                        value={name}
                        onChange={onNameChange}
                      />
                      <Button
                        type="text"
                        icon={<PlusOutlined />}
                        onClick={addItem}
                      >
                        添加用户权限
                      </Button>
                    </Space>
                  </>
                )}
              >
                {items.map((item) => (
                  <Option key={item}>{item}</Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item label="用户状态" name="state">
              <Radio.Group buttonStyle="solid" disabled={getUserFormId()}>
                <Radio.Button value="1">启用</Radio.Button>
                <Radio.Button value="2">停用</Radio.Button>
              </Radio.Group>
            </Form.Item>
            <Form.Item label="备注" name="note">
              <TextArea
                rows={2}
                allowClear
                autoComplete="true"
                disabled={getUserFormId()}
              />
            </Form.Item>
            <Form.Item
              label="头像"
              name="upload"
              valuePropName="fileList"
              getValueFromEvent={(e) => {
                if (Array.isArray(e)) {
                  return e;
                }
                return e && e.fileList;
              }}
            >
              <Upload
                disabled={getUserFormId()}
                name="avatar"
                listType="picture-card"
                className="avatar-uploader"
                showUploadList={false}
                action="http://admin.youah.cc/api/img"
                headers={{ reactToken: getToken() }}
                beforeUpload={beforeUpload}
                onChange={handleChange}
              >
                {imageUrl ? (
                  <img
                    src={imageUrl}
                    alt="avatar"
                    style={{
                      width: "100%",
                    }}
                  />
                ) : (
                  uploadButton
                )}
              </Upload>
            </Form.Item>
          </Form>
        </Spin>
      </Drawer>
    </>
  );
}

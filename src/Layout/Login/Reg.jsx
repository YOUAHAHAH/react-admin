import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Checkbox, Form, Input, message } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import { regUser } from "../../api/api";
import "./Login.less";
import bg from "../../assets/img/bg.jpg";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState(false);

  const RegBtn = () => {
    form.validateFields().then((values) => {
      setLoadings(true);
      setTimeout(() => {
        regUser({ values }).then((res) => {
          const { code, msg } = res;
          if (code === 200) {
            message.success(msg);
            setLoadings(false);
            navigate("/Login");
          } else {
            message.error(msg);
            setLoadings(false);
          }
        });
      }, 1000);
    });
  };

  return (
    <div className="login">
      <img className="login-img" src={bg} />
      <QueueAnim type={["right", "left"]} delay={100} className="demo-content">
        <div className="login-container" key="home">
          <QueueAnim type={["right", "left"]} className="demo-content">
            <h3 className="login-title" key="a">
              注册
            </h3>
          </QueueAnim>
          <QueueAnim type={["right", "left"]} className="demo-content">
            <div key="b">
              <Form
                name="basic"
                ref={formRef}
                form={form}
                initialValues={{
                  remember: false,
                }}
                autoComplete="off"
              >
                <Form.Item
                  name="username"
                  rules={[
                    {
                      required: true,
                      message: "请输入账号!",
                    },
                  ]}
                >
                  <Input
                    prefix={<UserOutlined />}
                    placeholder="请输入用户名"
                    autoComplete="off"
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="password"
                  rules={[
                    {
                      required: true,
                      message: "请输入密码!",
                    },
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请输入密码"
                    autoComplete="off"
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="confirm"
                  dependencies={["password"]}
                  hasFeedback
                  rules={[
                    {
                      required: true,
                      message: "请输入密码！",
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (!value || getFieldValue("password") === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error("请输入相同的密码!"));
                      },
                    }),
                  ]}
                >
                  <Input.Password
                    prefix={<LockOutlined />}
                    placeholder="请再次确认密码"
                    autoComplete="off"
                    allowClear
                  />
                </Form.Item>
                <Form.Item
                  name="remember"
                  valuePropName="checked"
                  rules={[
                    {
                      validator: (_, value) =>
                        value
                          ? Promise.resolve()
                          : Promise.reject(new Error("勾选后才能注册")),
                    },
                  ]}
                >
                  <Checkbox>我同意xxx隐私政策</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    loading={loadings}
                    className="login-btn"
                    onClick={RegBtn}
                  >
                    注册
                  </Button>
                </Form.Item>
                <Form.Item>
                  <Button
                    className="login-btn"
                    onClick={() => {
                      navigate("/Login");
                    }}
                  >
                    返回
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </QueueAnim>
        </div>
      </QueueAnim>
    </div>
  );
}

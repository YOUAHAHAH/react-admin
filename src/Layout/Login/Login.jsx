import React, { useRef, useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { Button, Checkbox, Form, Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import QueueAnim from "rc-queue-anim";
import { loginUser, tokenGetInfo } from "../../api/api";
import getToken from "../../utils/getToken";
import "./Login.less";
import bg from "../../assets/img/bg.jpg";

const { Link } = Typography;

const Login = (props) => {
  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
  });
  const navigate = useNavigate();
  const formRef = useRef(null);
  const [form] = Form.useForm();
  const [loadings, setLoadings] = useState(false);

  const loginBtn = () => {
    form.validateFields().then((values) => {
      setLoadings(true);
      setTimeout(() => {
        loginUser({ values }).then((res) => {
          const { code, data, msg } = res;
          if (code === 200) {
            localStorage.setItem("react-token", data.token);
            props.userToken();
            props.userInfo();
            localStorage.setItem("react-userInfo", JSON.stringify(data));
            message.success(msg);
            setLoadings(false);
            navigate("/");
          } else {
            message.error(msg);
            setLoadings(false);
          }
        });
      }, 1000);
    });
  };

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (size.width <= 1080) {
      navigate("/MobileError");
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="login">
      <img className="login-img" src={bg} />
      <QueueAnim type={["right", "left"]} delay={100} className="demo-content">
        <div className="login-container" key="home">
          <QueueAnim type={["right", "left"]} className="demo-content">
            <h3 className="login-title" key="a">
              登录
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
                <Form.Item name="remember" valuePropName="checked">
                  <Checkbox>记住我</Checkbox>
                </Form.Item>
                <Form.Item>
                  <Button
                    type="primary"
                    loading={loadings}
                    className="login-btn"
                    onClick={loginBtn}
                  >
                    登录
                  </Button>
                </Form.Item>
              </Form>
            </div>
          </QueueAnim>
          <Link
            onClick={() => {
              navigate("/Reg");
            }}
          >
            还没账号？立即注册
          </Link>
        </div>
      </QueueAnim>
    </div>
  );
};

// 将 token 存入 reducer
const mapDispatchToProps = (dispatch) => {
  return {
    userToken() {
      const action = { type: "getUserToken" };
      dispatch(action);
    },
    userInfo() {
      tokenGetInfo({ token: getToken() }).then((res) => {
        const { code, data } = res;
        if (code === 200) {
          const action = { type: "getUserInfo" };
          dispatch(action);
        }
      });
    },
  };
};

export default connect(null, mapDispatchToProps)(Login);

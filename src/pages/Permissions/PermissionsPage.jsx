import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Alert, Typography, Divider, Button, message, Spin } from "antd";
import { createUserToken } from "../../store/actions/userToken.js";
import { createUserInfoAsync } from "../../store/actions/userInfo.js";
import { tokenGetInfo } from "../../api/api";

const { Paragraph, Text } = Typography;

const PermissionsPage = (props) => {
  const navigate = useNavigate();
  const [userName, setUserName] = useState();
  const [loading, setLoading] = useState(true);

  const getUserInfo = (token) => {
    setLoading(true);
    setTimeout(() => {
      tokenGetInfo({ token }).then((res) => {
        const { code, data, msg } = res;
        if (code === 200) {
          setUserName(data[0].username);
          props.userToken(data[0].token);
          props.userInfo(data[0].token);
          localStorage.setItem("react-token", data[0].token);
          localStorage.setItem("react-userInfo", JSON.stringify(data[0]));
          setLoading(false);
        } else {
          message.error(msg);
          setLoading(false);
        }
      });
    }, 500);
  };

  const Btn = () => {
    if (userName === "test") {
      return (
        <>
          <Button onClick={getUserAdmin}>admin</Button>
          <Button style={{ marginLeft: "10px" }} type="primary">
            test
          </Button>
        </>
      );
    } else if (userName === "admin") {
      return (
        <>
          <Button type="primary">admin</Button>
          <Button style={{ marginLeft: "10px" }} onClick={getUserTest}>
            test
          </Button>
        </>
      );
    } else {
      return (
        <>
          <Button onClick={getUserAdmin}>admin</Button>
          <Button style={{ marginLeft: "10px" }} onClick={getUserTest}>
            test
          </Button>
        </>
      );
    }
  };

  // admin
  const getUserAdmin = () => {
    getUserInfo("456");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  // test
  const getUserTest = () => {
    getUserInfo("999");
    setTimeout(() => {
      navigate("/");
    }, 500);
  };

  useEffect(() => {
    getUserInfo(props.token);
  }, []);

  return (
    <>
      <Spin size="large" spinning={loading}>
        <Typography>
          <Alert message="??????????????????????????????" type="info" showIcon />
          <Divider />
          <Paragraph>
            <span>?????????????????????</span>
            <Button type="link">????????????????????????</Button>
            <Divider />
            <span>???????????????</span>
            <Text keyboard>{userName}</Text>
            <Divider />
            <span>???????????????</span>
            <Btn />
          </Paragraph>
        </Typography>
      </Spin>
    </>
  );
};

export default connect((state) => ({ token: state.userToken }), {
  userToken: createUserToken,
  userInfo: createUserInfoAsync,
})(PermissionsPage);

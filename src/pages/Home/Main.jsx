import React, { useState, useEffect } from "react";
import { Card, Tag, Image } from "antd";
import CountUp from "react-countup";
import QueueAnim from "rc-queue-anim";
import "./Main.less";
import shizhong from "../../assets/img/时钟.png";
import card from "../../assets/img/card.png";
import xiazai from "../../assets/img/下载图标.png";
import tubiao from "../../assets/img/图表.png";
import avatar from "../../assets/img/bg.jpg";

const countNum = (num1, num2, pic) => {
  return (
    <>
      <div className="num1">
        <CountUp
          start={0}
          end={num1}
          duration="1.5"
          style={{ fontSize: "26px" }}
          separator={","}
        ></CountUp>
        <img src={pic} style={{ width: "50px", height: "50px" }} />
      </div>
      <div className="num2">
        <span>总访问数</span>
        <CountUp
          start={0}
          end={num2}
          duration="1.5"
          style={{ fontSize: "16px" }}
          separator={","}
        ></CountUp>
      </div>
    </>
  );
};

const date = new Date().getHours();

const Main = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  });

  return (
    <>
      <QueueAnim
        className="demo-content"
        animConfig={[{ opacity: [1, 0], translateY: [0, 50] }]}
      >
        <Card
          key="b"
          style={{
            width: "100%",
            marginBottom: "20px",
          }}
          loading={loading}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <Image
              className="img"
              width={100}
              height={100}
              src={
                localStorage.getItem("react-userInfo")
                  ? JSON.parse(localStorage.getItem("react-userInfo")).picUrl
                    ? "http://admin.youah.cc" +
                      JSON.parse(localStorage.getItem("react-userInfo")).picUrl
                    : avatar
                  : navigate("/Login")
              }
            />
            <div className="date">
              <p>
                {date > 6 && date < 12
                  ? "上午好"
                  : date > 12 && date < 18
                  ? "下午好"
                  : "晚上好"}
                ：{JSON.parse(localStorage.getItem("react-userInfo")).username}
              </p>
            </div>
          </div>
        </Card>

        <div className="card" key="a">
          <Card
            hoverable
            loading={loading}
            title="访问数"
            extra={<Tag color="cyan">月</Tag>}
          >
            {countNum(2000, 6000, shizhong)}
          </Card>
          <Card
            hoverable
            loading={loading}
            title="成交额"
            extra={<Tag color="volcano">月</Tag>}
          >
            {countNum(50000, 500000, card)}
          </Card>
          <Card
            hoverable
            loading={loading}
            title="下载数"
            extra={<Tag color="purple">周</Tag>}
          >
            {countNum(8000, 18000, xiazai)}
          </Card>
          <Card
            hoverable
            loading={loading}
            title="成交数"
            extra={<Tag color="geekblue">年</Tag>}
          >
            {countNum(5000, 50000, tubiao)}
          </Card>
        </div>
      </QueueAnim>
    </>
  );
};

export default Main;

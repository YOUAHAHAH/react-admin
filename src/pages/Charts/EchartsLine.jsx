import React, { useState } from "react";
import * as echarts from "echarts";
import ReactECharts from "echarts-for-react";
import { Switch, message, Spin } from "antd";
import { BarChartOutlined, LineChartOutlined } from "@ant-design/icons";

// 在此组件中绘制一个简单的折线图
const EchartsLine = () => {
  const [Echarts, setEcharts] = useState(true);
  const [loading, setLoading] = useState(false);

  const date = new Date();
  const timesStamp = date.getTime();
  const currenDay = date.getDay();
  const dates = [];
  for (let i = 0; i < 7; i++) {
    let das = new Date(
      timesStamp -
        24 * 60 * 60 * 1000 * (i - ((currenDay + (7 - currenDay)) % 7))
    ).toLocaleDateString();
    das.replace(/[年月]/g, ".").replace(/[日上下午]/g, "");
    dates.push(das);
  }
  const dateArr = dates.reverse();

  // 折线图的配置对象
  let optionLine = {
    color: ["#80FFA5", "#00DDFF", "#37A2FF", "#FF0087", "#FFBF00"],
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "cross",
        label: {
          backgroundColor: "#6a7985",
        },
      },
    },
    legend: {
      data: [
        "奥利奥普通装",
        "奥利奥威化系列",
        "奥利奥巧脆卷",
        "奥利奥冰激凌风味",
        "奥利奥缤纷双果味",
      ],
    },
    toolbox: {
      feature: {
        saveAsImage: {},
      },
    },
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        boundaryGap: false,
        data: dateArr,
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "奥利奥普通装",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(128, 255, 165)",
            },
            {
              offset: 1,
              color: "rgb(1, 191, 236)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "奥利奥威化系列",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(0, 221, 255)",
            },
            {
              offset: 1,
              color: "rgb(77, 119, 255)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "奥利奥巧脆卷",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(55, 162, 255)",
            },
            {
              offset: 1,
              color: "rgb(116, 21, 219)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: "奥利奥冰激凌风味",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 0, 135)",
            },
            {
              offset: 1,
              color: "rgb(135, 0, 157)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: "奥利奥缤纷双果味",
        type: "line",
        stack: "Total",
        smooth: true,
        lineStyle: {
          width: 0,
        },
        showSymbol: false,
        label: {
          show: true,
          position: "top",
        },
        areaStyle: {
          opacity: 0.8,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: "rgb(255, 191, 0)",
            },
            {
              offset: 1,
              color: "rgb(224, 62, 76)",
            },
          ]),
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  };

  // 柱状图的配置对象
  let optionPost = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: {},
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: {
      type: "value",
    },
    yAxis: {
      type: "category",
      data: dateArr,
    },
    series: [
      {
        name: "奥利奥普通装",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [140, 232, 101, 264, 90, 340, 250],
      },
      {
        name: "奥利奥威化系列",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [120, 282, 111, 234, 220, 340, 310],
      },
      {
        name: "奥利奥巧脆卷",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [320, 132, 201, 334, 190, 130, 220],
      },
      {
        name: "奥利奥冰激凌风味",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 402, 231, 134, 190, 230, 120],
      },
      {
        name: "奥利奥缤纷双果味",
        type: "bar",
        stack: "total",
        label: {
          show: true,
        },
        emphasis: {
          focus: "series",
        },
        data: [220, 302, 181, 234, 210, 290, 150],
      },
    ],
  };

  return (
    <div style={{ width: "1000px", height: "100%" }}>
      <Switch
        checkedChildren={<LineChartOutlined />}
        unCheckedChildren={<BarChartOutlined />}
        defaultChecked
        loading={loading}
        onClick={() => {
          setLoading(true);
          setTimeout(() => {
            setEcharts((data) => (data = !Echarts));
            message.success(
              Echarts === true ? "柱状图切换成功" : "折线图切换成功"
            );
            setLoading(false);
          }, 1000);
        }}
      />
      <Spin
        spinning={loading}
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <ReactECharts option={Echarts === true ? optionLine : optionPost} />
      </Spin>
    </div>
  );
};

export default EchartsLine;

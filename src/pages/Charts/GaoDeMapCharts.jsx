import React from "react";
import {
  Map,
  APILoader,
  ScaleControl,
  ToolBarControl,
  ControlBarControl,
  Geolocation,
} from "@uiw/react-amap";
import { message } from "antd";

export default function GaoDeMapCharts() {
  return (
    <div style={{ width: "100%", height: "100%" }}>
      <APILoader akay="1f83429e194feea74bbfc859af49f8fc">
        <Map>
          <ScaleControl offset={[16, 30]} position="LB" />
          <ToolBarControl offset={[16, 10]} position="RB" />
          <ControlBarControl offset={[16, 180]} position="RB" />
          <Geolocation
            maximumAge={50000}
            borderRadius="5px"
            position="RB"
            offset={[16, 80]}
            zoomToAccuracy={true}
            showCircle={true}
            onComplete={(data) => {
              console.log("返回数据：", data);
            }}
            onError={() => {
              message.error("定位失败！");
            }}
          />
        </Map>
      </APILoader>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import R404 from "../../assets/img/404.png";

export default function Error() {
  const navigate = useNavigate();

  return (
    <div style={{ width: "100%", height: "100%", textAlign: "center" }}>
      <img src={R404} style={{ height: " 80%" }} />
      <div>
        <h2>404</h2>
        <p>你来到了没有知识的荒原！</p>
        <Button
          type="primary"
          onClick={() => {
            navigate("/");
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.less";
import R403 from "../../assets/img/403.png";

export default function Result403() {
  const navigate = useNavigate();

  return (
    <div className="r">
      <img src={R403} />
      <div>
        <h2>403</h2>
        <p>Sorry, you don't have access to this page.</p>
        <Button
          type="primary"
          onClick={() => {
            navigate(-1);
          }}
        >
          Go Back
        </Button>
      </div>
    </div>
  );
}

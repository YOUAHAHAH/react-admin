import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.less";
import R500 from "../../assets/img/500.png";

export default function Result500() {
  const navigate = useNavigate();

  return (
    <div className="r">
      <img src={R500} />
      <div>
        <h2>500</h2>
        <p>Sorry, the server is reporting an error..</p>
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

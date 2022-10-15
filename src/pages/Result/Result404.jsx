import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "antd";
import "./index.less";
import R404 from "../../assets/img/404.png";

export default function Result404() {
  const navigate = useNavigate();

  return (
    <div className="r">
      <img src={R404} />
      <div>
        <h2>404</h2>
        <p>Sorry, the page you visited does not exist.</p>
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

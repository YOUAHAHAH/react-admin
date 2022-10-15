import React, { useState, useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./MobileError.less";
import bg from "../../assets/img/bg.jpg";

export default function MobileError() {
  const navigate = useNavigate();

  const [size, setSize] = useState({
    width: document.documentElement.clientWidth,
  });

  const onResize = useCallback(() => {
    setSize({
      width: document.documentElement.clientWidth,
    });
  }, []);

  useEffect(() => {
    window.addEventListener("resize", onResize);
    if (size.width > 1080) {
      navigate("/");
    }
    return () => {
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <div className="mobile">
      <h3>暂不支持移动端，请用电脑查看！</h3>
      <img src={bg} style={{ width: "100vw", height: "100vh" }} />
    </div>
  );
}

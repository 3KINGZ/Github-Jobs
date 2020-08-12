import React from "react";
import loading from "../../images/Spin-1.3s-200px.svg";
import "./Loading.css";

const Loading = () => {
  return <img src={loading} alt="loading..." className="loading-img" />;
};

export default Loading;

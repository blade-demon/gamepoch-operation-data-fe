import React, { Component } from "react";
import CustomAppBar from "../components/CustomAppBar";
export default class Douyin extends Component {
  componentDidMount() {
    console.log("加载完成！");
  }
  render() {
    return (
      <div>
        <CustomAppBar title="抖音数据" />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center"
          }}
        >
          <iframe
            title="抖音数据"
            width="375"
            height="812"
            src="https://www.douyin.com/share/user/96389849439"
          />
        </div>
      </div>
    );
  }
}

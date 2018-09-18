import React, { Component } from "react";
import CustomAppBar from "../components/CustomAppBar";
export default class Spelunker extends Component {
  render() {
    return (
      <div>
        <CustomAppBar title="斯皮兰卡数据" />
        <div
          style={{
            width: "100%",
            height: "80%",
            overflow: "scroll",
            textAlign: "center"
          }}
        >
          <iframe
            width="1024"
            height="768"
            title="spelunker"
            src="https://app.powerbi.com/view?r=eyJrIjoiYzY5MjQ3ZmEtMTljYy00NjYxLTgyOWUtYzhlNTk4Y2ZiY2VmIiwidCI6IjZlZDA1MWQwLWRhZDEtNGZhNS1iZTNkLTAwMTMwYjhmYWYzMCIsImMiOjEwfQ%3D%3D"
            frameborder="0"
            allowFullScreen="true"
          />
        </div>
      </div>
    );
  }
}

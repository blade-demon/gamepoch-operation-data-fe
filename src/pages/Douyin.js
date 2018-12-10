import React, { Component } from "react";
import CustomAppBar from "../components/CustomAppBar";
import SimpleTabs from "../components/SimpleTabs";

export default class Douyin extends Component {
  state = {
    tabItems: ["核心运营数据", "视频互动数据", "内容管理数据"]
  };

  render() {
    return (
      <div>
        <CustomAppBar title="抖音数据" />
        <SimpleTabs
          tabItems={this.state.tabItems}
          imgs={[
            "https://news-summary-ziweigamepoch.c9users.io/img/douyin/data-analysis.png",
            "https://news-summary-ziweigamepoch.c9users.io/img/douyin/data-analysis-video.png",
            "https://news-summary-ziweigamepoch.c9users.io/img/douyin/data-analysis-content-manage.png"
          ]}
        />
      </div>
    );
  }
}

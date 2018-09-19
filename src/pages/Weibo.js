import React, { Component } from "react";
import CustomAppBar from "../components/CustomAppBar";
import SimpleTabs from "../components/SimpleTabs";

export default class Weibo extends Component {
  state = {
    tabItems: ["数据概览", "粉丝分析", "博文分析", "互动分析", "文章分析"]
  };

  render() {
    return (
      <div>
        <CustomAppBar title="微博数据" />
        <SimpleTabs tabItems={this.state.tabItems} />
      </div>
    );
  }
}

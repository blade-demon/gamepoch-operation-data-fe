import React, { Component } from "react";
import MediaCard from "../components/MediaCard";
import GamepochLogo from "../static/images/cards/gamepoch.jpg";
import WechatLogo from "../static/images/cards/wechat.png";
import WeiboLogo from "../static/images/cards/weibo.png";
import NBA2K18Logo from "../static/images/cards/nba2k18.png";
import NBA2K19Logo from "../static/images/cards/nba2k19.png";
import DouyinLogo from "../static/images/cards/douyin.png";
import SpelunkerLogo from "../static/images/cards/spelunker.png";
import CustomAppBar from "../components/CustomAppBar";

class Home extends Component {
  redirectToWechat = e => {
    this.props.history.push("/wechat");
  };

  redirectToWeibo = e => {
    this.props.history.push("/weibo");
  };

  redirectToDouyin = e => {
    this.props.history.push("/douyin");
  };

  redirectToGamepoch = e => {
    this.props.history.push("/official_website");
  };

  redirectToNBA2K19 = e => {
    this.props.history.push("/nba2k19_website");
  };

  redirectToNBA2K18 = e => {
    this.props.history.push("/nba2k18_website");
  };

  redirectToSpelunker = e => {
    this.props.history.push("/spelunker");
  };

  render() {
    return (
      <div>
        <CustomAppBar title="Gamepoch星游纪运营数据" />
        <div style={{}}>
          <MediaCard
            title="微信公众号"
            subtitle="Gamepoch星游纪"
            coverImage={WechatLogo}
            onClick={this.redirectToWechat}
          />
          <MediaCard
            title="微博"
            subtitle="Gamepoch星游纪"
            coverImage={WeiboLogo}
            onClick={this.redirectToWeibo}
          />
          <MediaCard
            title="抖音"
            subtitle=""
            coverImage={DouyinLogo}
            onClick={this.redirectToDouyin}
          />
          <MediaCard
            title="Gamepoch官网"
            subtitle="https://www.gamepoch.com"
            coverImage={GamepochLogo}
            onClick={this.redirectToGamepoch}
          />
          <MediaCard
            title="NBA2K19官网"
            subtitle="https://nba2k19.gamepoch.com"
            coverImage={NBA2K19Logo}
            onClick={this.redirectToNBA2K19}
          />
          <MediaCard
            title="NBA2K18官网"
            subtitle="https://nba2k18.gamepoch.com"
            coverImage={NBA2K18Logo}
            onClick={this.redirectToNBA2K18}
          />
          <MediaCard
            title="斯皮兰卡先生"
            subtitle=""
            coverImage={SpelunkerLogo}
            onClick={this.redirectToSpelunker}
          />
          {/* <MediaCard
            title="斯皮兰卡先生"
            subtitle=""
            // coverImage={NBA2K18Logo}
            onClick={this.redirectToSpelunker}
          /> */}
        </div>
      </div>
    );
  }
}

export default Home;

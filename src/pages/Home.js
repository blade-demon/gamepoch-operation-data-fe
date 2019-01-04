import React, { Component } from "react";
import Grid from "@material-ui/core/Grid";
import MediaCard from "../components/MediaCard";
import GamepochLogo from "../static/images/cards/gamepoch.jpg";
import WechatLogo from "../static/images/cards/wechat.png";
import WeiboLogo from "../static/images/cards/weibo.png";
import KOF14Logo from "../static/images/cards/kof14.jpg";
import NBA2K18Logo from "../static/images/cards/nba2k18.png";
import NBA2K19Logo from "../static/images/cards/nba2k19.png";
import DouyinLogo from "../static/images/cards/douyin.png";
import SpelunkerLogo from "../static/images/cards/spelunker.png";
import CustomAppBar from "../components/CustomAppBar";

class Home extends Component {
  redirectToPage = input => e => {
    e.preventDefault();
    this.props.history.push("/" + input);
  };

  render() {
    return (
      <React.Fragment>
        <CustomAppBar title="Gamepoch星游纪运营数据" />
        <Grid container spacing={8}>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="微信公众号"
              subtitle="每日早上8点更新"
              coverImage={WechatLogo}
              onClick={this.redirectToPage("wechat")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="微博"
              subtitle="每天10早上点更新"
              coverImage={WeiboLogo}
              onClick={this.redirectToPage("weibo")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="抖音"
              subtitle="每天凌晨0点更新"
              coverImage={DouyinLogo}
              onClick={this.redirectToPage("douyin")}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="Gamepoch官网"
              subtitle="每天凌晨0点更新"
              coverImage={GamepochLogo}
              onClick={this.redirectToPage("official_website")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="NBA2K19官网"
              subtitle="每天凌晨0点更新"
              coverImage={NBA2K19Logo}
              onClick={this.redirectToPage("nba2k19_website")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="NBA2K18官网"
              subtitle="每天凌晨0点更新"
              coverImage={NBA2K18Logo}
              onClick={this.redirectToPage("nba2k18_website")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={4} lg={3}>
            <MediaCard
              title="斯皮兰卡先生"
              subtitle="每周二早上8点更新"
              coverImage={SpelunkerLogo}
              onClick={this.redirectToPage("spelunker")}
            />
          </Grid>

          <Grid item xs={12} sm={6} md={3} lg={3}>
            <MediaCard
              title="拳皇14人物兑换码"
              subtitle="可以查询人物兑换码"
              coverImage={KOF14Logo}
              onClick={this.redirectToPage("kof14code")}
            />
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

export default Home;

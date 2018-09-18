import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import SwipeableViews from "react-swipeable-views";
// import Button from "@material-ui/core/Button";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import LinearIndeterminate from "../components/LinearIndeterminate";
import Table from "../components/Table";
import CustomAppBar from "../components/CustomAppBar";
import CustomSelect from "../components/CustomSelect";
import Moment from "moment";
import { extendMoment } from "moment-range";
import CustomListItem from "../components/CustomListItem";
import Api from "../api/api";
import "./FixedTabs.css";

const moment = extendMoment(Moment);

function TabContainer({ children, dir }) {
  return (
    <Typography component="div" dir={dir}>
      {children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired,
  dir: PropTypes.string.isRequired
};

const styles = theme => ({
  root: {
    backgroundColor: theme.palette.background.paper
  }
});

class FullWidthTabs extends React.Component {
  state = {
    value: 0,
    showProgress: true,
    currentDate: new moment().add(-1, "days").format("YYYY-MM-DD"),
    dateRange: Array.from(
      moment
        .range(
          new moment().add(-7, "days").format("YYYY-MM-DD"),
          new moment().add(-1, "days").format("YYYY-MM-DD")
        )
        .by("days")
    ).map(day => day.format("YYYY-MM-DD")),
    latestDaysUserRead: {
      int_page_read_count: 0,
      share_count: 0,
      add_to_fav_count: 0
    },
    tableDataArray: [],
    cumulate_user: 0,
    new_user: 0,
    cancel_user: 0,
    int_page_read_count: 0,
    target_user: 0,
    share_count: 0,
    add_to_fav_count: 0,
    calcNetUsers: 0,
    calcNewUsers: 0,
    calcCancelUsers: 0,
    recentArticles: [],
    options: {
      chart: {
        type: "area"
      },
      title: "none",
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: { day: "%m-%d" },
        tickInterval: 24 * 3600 * 1000
      },
      yAxis: {
        title: {
          text: null
        },
        pointStart: 8000
      },
      legend: {},
      series: [
        // {
        //   name: "用户总数",
        //   data: [0, 0, 0, 0, 0, 0, 0, 0]
        // },
        {
          name: "新关注用户",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "取消关注",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        },
        {
          name: "净增关注",
          data: [0, 0, 0, 0, 0, 0, 0, 0]
        }
      ],

      responsive: {
        rules: [
          {
            condition: {
              // maxWidth: 500
            },
            chartOptions: {
              legend: {}
            }
          }
        ]
      }
    }
  };

  handleChange = async (event, value) => {
    this.setState({ value });
    console.log(value);
    this.setState({
      showProgress: true
    });
    await this.getNewsData();
    this.setState({
      showProgress: false
    });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };

  // 计算做题图文的昨日数据
  calcYesterdayUserRead = async dateArray => {
    try {
      const userReadArray = await Api.getuserread(
        new Array([...dateArray].pop())
      );
      if (userReadArray.length > 0) {
        this.setState(
          userReadArray.reduce((accumulator, currentValue) => {
            return {
              int_page_read_count:
                accumulator.int_page_read_count +
                currentValue.int_page_read_count,
              share_count: accumulator.share_count + currentValue.share_count,
              add_to_fav_count:
                accumulator.add_to_fav_count + currentValue.add_to_fav_count
            };
          })
        );
      }
    } catch (e) {
      console.log(e);
    }
  };

  // 计算最近任意天数的数据
  calcDaysUserRead = async dateArray => {
    try {
      const userReadArray = await Api.getuserread(dateArray);
      if (userReadArray.length > 0) {
        const latestDaysUserRead = userReadArray.reduce(
          (accumulator, currentValue) => {
            return {
              int_page_read_count:
                accumulator.int_page_read_count +
                currentValue.int_page_read_count,
              share_count: accumulator.share_count + currentValue.share_count,
              add_to_fav_count:
                accumulator.add_to_fav_count + currentValue.add_to_fav_count
            };
          }
        );
        this.setState({
          latestDaysUserRead
        });
      }
    } catch (e) {
      console.log(e);
    }
  };

  async componentWillMount() {
    await this.getUserData(this.state.dateRange);
    this.setState({ showProgress: false });
  }

  // 获得新闻数据
  async getNewsData() {
    try {
      const dateArray = this.state.dateRange;
      await this.calcYesterdayUserRead(dateArray);
      await this.calcDaysUserRead(dateArray);
      const articleTotalData = await Api.getarticletotal(dateArray);
      console.log(articleTotalData);
      await this.setState({
        recentArticles: articleTotalData
          .map(article => ({
            title: article.title,
            date: article.ref_date,
            readCount: [...article.details].pop()
              .int_page_from_session_read_count,
            shareCount: [...article.details].pop().share_count,
            favCount: [...article.details].pop().add_to_fav_count
          }))
          .sort((a, b) => new Date(b.date) - new Date(a.date))
      });
    } catch (e) {
      console.log(e);
    }
  }

  async getUserData(dateArray) {
    const usercumulateArray = await Api.getusercumulate(dateArray);
    const usersummaryArray = await Api.getusersummary(dateArray);

    let dailyData = usercumulateArray.map(item => ({
      ref_date: item.ref_date || "2018-01-01",
      cumulate_user: item.cumulate_user || 0,
      new_user: 0,
      cancel_user: 0,
      net_user: 0
    }));

    if (dailyData.length === 0) {
      return;
    }

    console.log(dailyData);

    let cumulateUserArray = [];
    let newUserArray = [];
    let cancelUserArray = [];
    let netUserArray = [];
    let calcNewUsers = 0;
    let calcNetUsers = 0;
    let calcCancelUsers = 0;

    for (let data of dailyData) {
      let date = data.ref_date;
      let filteredArray = usersummaryArray.filter(
        item => item.ref_date === date
      );
      for (let j = 0; j < filteredArray.length; j++) {
        data.new_user += filteredArray[j].new_user;
        data.cancel_user += filteredArray[j].cancel_user;
      }
      data.net_user = data.new_user - data.cancel_user;
      cumulateUserArray.push([new Date(date).valueOf(), data.cumulate_user]);
      newUserArray.push([new Date(date).valueOf(), data.new_user]);
      cancelUserArray.push([new Date(date).valueOf(), data.cancel_user]);
      netUserArray.push([new Date(date).valueOf(), data.net_user]);

      calcNetUsers += data.net_user;
      calcNewUsers += data.new_user;
      calcCancelUsers += data.cancel_user;
    }

    await this.setState({
      tableDataArray: dailyData,
      calcNewUsers,
      calcCancelUsers,
      calcNetUsers,
      cumulate_user: dailyData[dailyData.length - 1].cumulate_user,
      new_user: dailyData[dailyData.length - 1].new_user,
      cancel_user: dailyData[dailyData.length - 1].cancel_user,
      options: {
        series: [
          // {
          //   name: "用户总数",
          //   data: cumulateUserArray
          // },
          {
            name: "新关注用户",
            data: newUserArray
          },
          {
            name: "取消关注",
            data: cancelUserArray
          },
          {
            name: "净增关注",
            data: netUserArray
          }
        ]
      }
    });
  }

  setDateRange = async days => {
    const dateArray = Array.from(
      moment
        .range(
          new moment().add(-days, "days").format("YYYY-MM-DD"),
          new moment().add(-1, "days").format("YYYY-MM-DD")
        )
        .by("days")
    ).map(day => day.format("YYYY-MM-DD"));

    await this.setState({
      dateRange: dateArray,
      showProgress: true
    });

    await this.getUserData(dateArray);
    await this.getNewsData(dateArray);
    this.setState({
      showProgress: false
    });
  };

  render() {
    const { classes, theme } = this.props;
    return (
      <div className={classes.root}>
        <CustomAppBar title="微信公众号数据" />
        <AppBar position="static" color="default">
          <Tabs
            value={this.state.value}
            onChange={this.handleChange}
            indicatorColor="primary"
            textColor="primary"
            fullWidth
            centered
          >
            <Tab label="用户分析" />
            <Tab label="图文分析" />
          </Tabs>
        </AppBar>
        <LinearIndeterminate
          style={{ display: this.state.showProgress ? "block" : "none" }}
        />
        <SwipeableViews
          axis={theme.direction === "rtl" ? "x-reverse" : "x"}
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer dir={theme.direction}>
            <section>
              <h3>用户概况</h3>
              <div>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <p className="center big">{this.state.cumulate_user}</p>
                    <p className="center small">用户总数</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.new_user}</p>
                    <p className="center small">昨日新增</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.cancel_user}</p>
                    <p className="center small">取消关注</p>
                  </Grid>
                </Grid>
              </div>
              <p className="center ex-small">
                用户数据更新至
                {this.state.currentDate}
              </p>
            </section>

            <section>
              <div>
                <Grid container>
                  <Grid item xs={6}>
                    <h3>用户总数</h3>
                  </Grid>
                  <Grid item xs={6}>
                    <CustomSelect
                      setDateRange={
                        this.setDateRange // name="userDateSelect"
                      }
                    />
                  </Grid>
                </Grid>
              </div>
              <div style={{ margin: "1rem 0" }}>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <p className="center big">{this.state.calcNetUsers}</p>
                    <p className="center small">累计净增关注</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.calcNewUsers}</p>
                    <p className="center small">累计新增关注</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.calcCancelUsers}</p>
                    <p className="center small">累计取消关注</p>
                  </Grid>
                </Grid>
              </div>
              <HighchartsReact
                highcharts={Highcharts}
                options={this.state.options}
              />
            </section>

            <section className="noPadding">
              <h3 className="paddingLeft">数据详情</h3>
              <Table dataArray={this.state.tableDataArray} />
            </section>
          </TabContainer>
          <TabContainer dir={theme.direction}>
            <section>
              <div className="flexContainer" justify="center">
                <h3>昨日概况</h3>
                {/* <span className="link">详细数据 ></span> */}
              </div>
              <div>
                <Grid container justify="center">
                  <Grid item xs={4}>
                    <p className="center big">
                      {this.state.int_page_read_count}
                    </p>
                    <p className="center small">阅读次数</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.share_count}</p>
                    <p className="center small">分享转发次数</p>
                  </Grid>
                  <Grid item xs={4}>
                    <p className="center big">{this.state.add_to_fav_count}</p>
                    <p className="center small">微信收藏次数</p>
                  </Grid>
                </Grid>
              </div>
              <p className="center ex-small">
                图文阅读数据更新至
                {this.state.currentDate}
              </p>
            </section>
            <section>
              <Grid container>
                <Grid item xs={6}>
                  <h3>最近群发</h3>
                </Grid>
                <Grid item xs={6} style={{ justifyItems: "center" }}>
                  <CustomSelect setDateRange={this.setDateRange} />
                </Grid>
              </Grid>
              <div>
                <Grid container justify="center">
                  <Grid item xs={3}>
                    <p className="center big">
                      {this.state.recentArticles.length}
                    </p>
                    <p className="center small">文章推送数</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className="center big">
                      {this.state.latestDaysUserRead.int_page_read_count}
                    </p>
                    <p className="center small">阅读次数</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className="center big">
                      {this.state.latestDaysUserRead.share_count}
                    </p>
                    <p className="center small">分享次数</p>
                  </Grid>
                  <Grid item xs={3}>
                    <p className="center big">
                      {this.state.latestDaysUserRead.add_to_fav_count}
                    </p>
                    <p className="center small">微信收藏次数</p>
                  </Grid>
                </Grid>
              </div>
            </section>

            {/* <p style={{ width: "100%", textAlign: "center" }}>
              共{this.state.recentArticles.length}篇图文
            </p> */}
            {this.state.recentArticles.map((article, index) => (
              <CustomListItem
                key={index}
                title={article.title}
                favCount={article.favCount}
                date={article.date}
                readCount={article.readCount}
                shareCount={article.shareCount}
              />
            ))}
          </TabContainer>
        </SwipeableViews>
      </div>
    );
  }
}

FullWidthTabs.propTypes = {
  classes: PropTypes.object.isRequired,
  theme: PropTypes.object.isRequired
};

export default withStyles(styles, { withTheme: true })(FullWidthTabs);

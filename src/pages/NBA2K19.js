import React, { Component } from "react";
import CustomAppBar from "../components/CustomAppBar";
import LinearIndeterminate from "../components/LinearIndeterminate";
import WebsiteTable from "../components/WebsiteTable";
import axios from "axios";
import ReactHighcharts from "react-highcharts";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import Moment from "moment";
import { extendMoment } from "moment-range";
const moment = extendMoment(Moment);
class NBA2K19 extends Component {
  state = {
    data: [],
    showProgress: true,
    tableDataArray: [],
    options: {
      title: { text: null },
      xAxis: {
        type: "datetime",
        dateTimeLabelFormats: { day: "%m-%d" },
        tickInterval: 24 * 3600 * 1000
      },
      yAxis: { type: "number", title: { text: null } },
      tooltip: {
        formatter: function() {
          return this.y;
        }
      },
      legend: { enabled: true }
    }
  };

  componentWillMount() {
    axios
      .get(`https://news-summary-ziweigamepoch.c9users.io/nba2k19`)
      .then(res => {
        console.log(res.data);
        let data = [];
        res.data.daysOf7PageViewsResult.forEach(function(value) {
          let year = Number(value[0].substr(0, 4));
          let month = Number(value[0].substr(4, 2));
          let day = Number(value[0].substr(6, 2));
          data.push([
            moment.utc([year, month - 1, day]).valueOf(),
            Number(value[1])
          ]);
        });

        console.log(data);
        this.setState({
          data: res.data,
          tableDataArray: res.data.daysOf7Result,
          showProgress: false,
          options: {
            title: { text: null },
            xAxis: {
              type: "datetime",
              dateTimeLabelFormats: { day: "%m-%d" },
              tickInterval: 24 * 3600 * 1000
            },
            series: [
              {
                name: "页面浏览量",
                data
              }
            ]
          }
        });
      })
      .catch(e => {
        console.log(e);
      });
  }

  setDateRange = e => {
    let data = [];
    if (e.currentTarget.name === "30days") {
      this.state.data.daysOf30PageViewsResult.forEach(function(value) {
        let year = Number(value[0].substr(0, 4));
        let month = Number(value[0].substr(4, 2));
        let day = Number(value[0].substr(6, 2));
        data.push([
          moment.utc([year, month - 1, day]).valueOf(),
          Number(value[1])
        ]);
      });
      this.setState({
        tableDataArray: this.state.data.daysOf30Result,
        options: {
          title: { text: null },
          xAxis: {
            type: "datetime",
            dateTimeLabelFormats: { day: "%m-%d" },
            tickInterval: 24 * 3600 * 1000
          },
          series: [
            {
              name: "页面浏览量",
              data
            }
          ]
        }
      });
    }
    if (e.currentTarget.name === "7days") {
      this.state.data.daysOf7PageViewsResult.forEach(function(value) {
        let year = Number(value[0].substr(0, 4));
        let month = Number(value[0].substr(4, 2));
        let day = Number(value[0].substr(6, 2));
        data.push([
          moment.utc([year, month - 1, day]).valueOf(),
          Number(value[1])
        ]);
      });
      this.setState({
        tableDataArray: this.state.data.daysOf7Result,
        options: {
          title: { text: null },
          xAxis: {
            type: "datetime",
            dateTimeLabelFormats: { day: "%m-%d" },
            tickInterval: 24 * 3600 * 1000
          },
          series: [
            {
              name: "页面浏览量",
              data
            }
          ]
        }
      });
    }
  };

  render() {
    return (
      <div style={{ textAlign: "center" }}>
        <CustomAppBar title="NBA2K19数据" />
        <LinearIndeterminate
          style={{ display: this.state.showProgress ? "block" : "none" }}
        />
        <div>
          <Button
            name="7days"
            variant="outlined"
            color="primary"
            style={{ margin: "1rem" }}
            onClick={this.setDateRange}
          >
            7天数据
          </Button>
          <Button
            name="30days"
            variant="outlined"
            color="primary"
            style={{ margin: "1rem" }}
            onClick={this.setDateRange}
          >
            30天数据
          </Button>
        </div>
        <Paper elevation={1} margin={20}>
          <ReactHighcharts config={this.state.options} ref="chart" />
        </Paper>
        {/* <CircularLoading /> */}
        <WebsiteTable dataArray={this.state.tableDataArray} />
      </div>
    );
  }
}

export default NBA2K19;

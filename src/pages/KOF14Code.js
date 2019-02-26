import React, { Component } from "react";
import { MuiThemeProvider } from "@material-ui/core/styles";
import CustomAppBar from "../components/CustomAppBar";
import Button from "@material-ui/core/Button";
import Card from "@material-ui/core/Card";
import TextField from "@material-ui/core/TextField";
import axios from "axios";
const styles = {
  container: {
    margin: 50
  },
  resultContainer: {
    marginTop: 10,
    padding: 20
  }
};

export default class KOF14Code extends Component {
  constructor(props) {
    super(props);
    this.state = { code2018: "", code2017: "" };
    this.checkcode2018 = this.checkcode2018.bind(this);
    this.checkcode2017 = this.checkcode2017.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkcode2018(event) {
    event.preventDefault();
    const { code } = this.state;

    return axios
      .get(`https://kof14code.gamepoch.com/api/codes/query?code0=${code}`)
      .then(res => {
        console.log(res.data);
        this.setState({ result1: JSON.stringify(res.data) });
      })
      .catch(e => console.log(e));
  }

  checkcode2017(event) {
    event.preventDefault();
    const { code2018 } = this.state;

    return axios
      .get(`https://kof14code.gamepoch.com/api/codes/query?code1=${code2018}`)
      .then(res => {
        console.log(res.data);
        this.setState({ result2: JSON.stringify(res.data) });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <CustomAppBar title="拳皇14人物兑换码查询" />
          <div style={styles.container}>
            <p>功能：根据二维码查询2018年人物兑换码</p>
            <Card style={styles.resultContainer}>
              <label>2018年人物兑换码查询结果：</label>
              {this.state.result1 === "" ? (
                <h3>没有数据</h3>
              ) : (
                <h3>{this.state.result1}</h3>
              )}

              <form noValidate autoComplete="off" onSubmit={this.checkcode2018}>
                <label>在下面的输入框输入兑换码后点击查询</label>
                <TextField
                  label="原始兑换码，格式为：XXXXXXXXXXXX"
                  value={this.state.code}
                  onChange={this.handleChange("code")}
                  fullWidth
                  type="text"
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="primary"
                >
                  查询
                </Button>
              </form>
            </Card>
          </div>
          <div style={styles.container}>
            <p>功能：根据2018年的人物兑换码查询2017年人物兑换码</p>
            <Card style={styles.resultContainer}>
              <label>2017年人物兑换码查询结果：</label>
              {this.state.result2 === "" ? (
                <h3>没有数据</h3>
              ) : (
                <h3>{this.state.result2}</h3>
              )}

              <form noValidate autoComplete="off" onSubmit={this.checkcode2017}>
                <label>在下面的输入框输入2018年人物兑换码后点击查询</label>
                <TextField
                  label="2018年人物兑换码，格式为：XXXX-XXXX-XXXX"
                  value={this.state.code2018}
                  onChange={this.handleChange("code2018")}
                  fullWidth
                  type="text"
                  margin="normal"
                />
                <Button
                  type="submit"
                  variant="outlined"
                  fullWidth
                  color="primary"
                >
                  查询
                </Button>
              </form>
            </Card>
          </div>
        </React.Fragment>
      </MuiThemeProvider>
    );
  }
}

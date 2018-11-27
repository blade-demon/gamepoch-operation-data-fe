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
    this.checkcode = this.checkcode.bind(this);
  }

  handleChange = name => event => {
    this.setState({ [name]: event.target.value });
  };

  checkcode(event) {
    event.preventDefault();
    const { code2018 } = this.state;

    return axios
      .get(`https://kof14code.gamepoch.com/api/codes/query?code1=${code2018}`)
      .then(res => {
        console.log(res.data);
        this.setState({ code2017: res.data });
      })
      .catch(e => console.log(e));
  }

  render() {
    return (
      <MuiThemeProvider>
        <React.Fragment>
          <CustomAppBar title="拳皇14人物兑换码查询" />
          <div style={styles.container}>
            <p>功能：根据2018年的人物兑换码查询2017年人物兑换码</p>
            <Card style={styles.resultContainer}>
              <label>2017年人物兑换码查询结果：</label>
              {this.state.code2017 === "" ? (
                <h3>XXXX-XXXX-XXXX</h3>
              ) : (
                <h3>{this.state.code2017}</h3>
              )}

              <form noValidate autoComplete="off" onSubmit={this.checkcode}>
                <label>在下面的输入框输入2018年人物兑换码后点击查询</label>
                <TextField
                  label="2018年人物兑换码"
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

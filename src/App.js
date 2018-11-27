import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// import FixedTabs from "./pages/FixedTabs";
import Home from "./pages/Home";
import Wechat from "./pages/Wechat";
import Weibo from "./pages/Weibo";
import Official from "./pages/Official";
import NBA2K19 from "./pages/NBA2K19";
import NBA2K18 from "./pages/NBA2K18";
import Douyin from "./pages/Douyin";
import Spelunker from "./pages/Spelunker";
import KOF14Code from "./pages/KOF14Code";
import NotFound from "./pages/NotFound";
import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <React.Fragment>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/wechat" component={Wechat} />
            <Route path="/weibo" component={Weibo} />
            <Route path="/douyin" component={Douyin} />
            <Route path="/official_website" component={Official} />
            <Route path="/nba2k19_website" component={NBA2K19} />
            <Route path="/nba2k18_website" component={NBA2K18} />
            <Route path="/spelunker" component={Spelunker} />
            <Route path="/kof14code" component={KOF14Code} />
            <Route component={NotFound} />
          </Switch>
        </React.Fragment>
      </Router>
    );
  }
}

export default App;

import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";

// import FixedTabs from "./pages/FixedTabs";
import Home from "./pages/Home";
import Wechat from "./pages/Wechat";
import Weibo from './pages/Weibo';
import Official from "./pages/Official";
import NBA2K19 from "./pages/NBA2K19";
import NBA2K18 from "./pages/NBA2K18";
import Douyin from "./pages/Douyin";
import Spelunker from "./pages/Spelunker";
import NotFound from './pages/NotFound';
import "./App.css";

class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Switch>
            <Route path="/" component={Home} exact={true} />
            <Route path="/wechat" component={Wechat} />
            <Route path="/weibo" component={Weibo} />
            <Route path="/douyin" component={Douyin} />
            <Route path="/official_website" component={Official} />
            <Route path="/nba2k19_website" component={NBA2K19} />
            <Route path="/nba2k18_website" component={NBA2K18} />
            <Route path="/spelunker" component={Spelunker} />
            <Route component={NotFound} />
          </Switch>
        </div>
      </BrowserRouter>
    )
  }
}

export default App;












import React, { Component } from "react";

export default class CustomListItem extends Component {
  render() {
    return (
      <div>
        <section className="gapSmaller">
          <div className="articleWrapper">
            <div className="articleWrapper__body">
              <p>{this.props.title}</p>
            </div>
            <div className="articleWrapper__footer">
              <span className="small">
                阅读次数 <strong>{this.props.readCount}</strong>
              </span>
              <span className="small left">
                点赞次数 <strong>{this.props.favCount}</strong>
              </span>
              <span className="small left">
                分享次数 <strong>{this.props.shareCount}</strong>
              </span>
              <span className="small">{this.props.date.slice(5, 10)}</span>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

import React, { Component } from "react";
import Right from "../../files/right.png";
import Left from "../../files/left.png";

class Pics extends Component {
  state = {
    pics: [],
    shwonPic: "",
    shownIdx: 0,
  };

  componentDidMount() {
    const pics = [...this.props.gallery];
    this.setState({ pics, shwonPic: pics[0] });
  }

  goRight = () => {
    const { pics, shownIdx } = this.state;
    const len = pics?.length;
    if (shownIdx < len - 1)
      this.setState({ shownIdx: shownIdx + 1, shwonPic: pics[shownIdx + 1] });
    else this.setState({ shownIdx: 0, shwonPic: pics[0] });
  };

  goLeft = () => {
    const { pics, shownIdx } = this.state;
    const len = pics?.length;
    if (shownIdx > 0)
      this.setState({ shownIdx: shownIdx - 1, shwonPic: pics[shownIdx - 1] });
    else this.setState({ shownIdx: len - 1, shwonPic: pics[len - 1] });
  };

  render() {
    const { shwonPic } = this.state;
    return (
      <div className="cart_pics">
        <div className="left" onClick={this.goLeft}>
          <div>
            <img src={Left} alt="left" />
          </div>
        </div>
        <img src={shwonPic} alt="shown pic" />
        <div className="right" onClick={this.goRight}>
          <div>
            <img src={Right} alt="right" />
          </div>
        </div>
      </div>
    );
  }
}

export default Pics;

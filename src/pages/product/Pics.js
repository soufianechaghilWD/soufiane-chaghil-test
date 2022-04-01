import React, { Component } from "react";

class Pics extends Component {
  render() {
    const { pics, setPic } = this.props;

    return (
      <div className="pics">
        {pics?.map((pic, idx) => {
          return (
            <img
              src={pic}
              alt="PicProduct"
              key={idx + "PicProduct"}
              onClick={() => {
                setPic(pic);
              }}
            />
          );
        })}
      </div>
    );
  }
}

export default Pics;

import React, { Component } from "react";

class CartOverlay extends Component {

    constructor(props){
        super(props)

        this.wrapperRef = React.createRef();
    this.setWrapperRef = this?.setWrapperRef?.bind(this);
    this.handleClickOutside = this?.handleClickOutside?.bind(this);
    }

    componentDidMount() {
        document.addEventListener("mousedown", this?.handleClickOutside);
      }
    
      componentWillUnmount() {
        document?.removeEventListener("mousedown", this?.handleClickOutside);
      }
    
      handleClickOutside(event) {
        if (
          this?.wrapperRef &&
          !this?.wrapperRef?.current?.contains(event?.target)
        ) {
          this?.props?.setOpenCartOverlay();
        }
      }

  render() {
    return (
      <section className="cart_overlay">
        <div className="cart_overlay_body" ref={this.wrapperRef}>
            <h2>My bag</h2>
        </div>
      </section>
    );
  }
}

export default CartOverlay;

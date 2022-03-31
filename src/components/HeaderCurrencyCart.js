import React, { Component } from "react";
import DataContext from "../context/dataContext";
import Down from "../files/down.png";
import CartPic from "../files/cart.png";
import "../styles/HeaderCurrencyCart.css";
import CurrencyDropDown from "./CurrencyDropDown";
import CartOverlay from "./CartOverlay";

class HeaderCurrencyCart extends Component {
  state = {
    openCurrencyDropDown: false,
  };

  static contextType = DataContext;

  setOpenCurrencyDropDown = () => {
    this.setState({ openCurrencyDropDown: !this.state.openCurrencyDropDown });
  };

  render() {
    const { currency, cart } = this.context;
    const { openCurrencyDropDown } = this.state;

    const { openCartOverlay, setOpenCartOverlay } = this.props;

    return (
      <div className="header__right__container">
        <div className="header__currency">
          <div
            onClick={() =>
              this.setState({ openCurrencyDropDown: !openCurrencyDropDown })
            }
          >
            {currency.symbol}
            <img src={Down} alt="Down/Up" />
          </div>
          {openCurrencyDropDown === true && (
            <CurrencyDropDown
              setOpenCurrencyDropDown={this.setOpenCurrencyDropDown}
            />
          )}
        </div>

        <div className="header__cart">
          <div onClick={setOpenCartOverlay}>
            <img src={CartPic} alt="Cart rep" />
            {cart?.length > 0 && <p>{cart?.length}</p>}
          </div>
        </div>
        {openCartOverlay === true && <CartOverlay setOpenCartOverlay={setOpenCartOverlay} />}
      </div>
    );
  }
}

export default HeaderCurrencyCart;

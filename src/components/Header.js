import React, { Component } from "react";
import { Link } from "react-router-dom";
import HeaderItems from "./HeaderItems";
import Logo from "../files/logo.png"
import HeaderCurrencyCart from "./HeaderCurrencyCart";
import '../styles/Header.css'

class Header extends Component {

  state={
    openCartOverlay: false
  }

  setOpenCartOverlay = () => {
    this.setState({openCartOverlay: !this.state.openCartOverlay})
  }

  render() {

    const { openCartOverlay } = this.state

    return <header>
      <HeaderItems />
      <div className="header__logo">
        <Link to='/'>
          <img src={Logo} alt="Logo" />
        </Link>
      </div>
      <HeaderCurrencyCart setOpenCartOverlay={this.setOpenCartOverlay} openCartOverlay={openCartOverlay} />
    </header>
  }
}

export default Header;

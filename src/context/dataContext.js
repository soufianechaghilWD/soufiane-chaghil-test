import React, { Component } from "react";

const DataContext = React.createContext();

class DataProvider extends Component {
  state = {
    currency: {
      label: "USD",
      symbol: "$",
    },
    activeHeaderOption: "all",
    cart: [],
  };

  // set currency
  setCurrency = (newCurrency) => {
    this.setState({ currency: newCurrency });
  };

  // set active header option
  setActiveHeaderOption = (newActiveHeaderOption) => {
    this.setState({ activeHeaderOption: newActiveHeaderOption });
  };
  // add/Increase/Decrease from cart
  // setCart = (type, item) => {
  //   var newCart = [...this.state.cart]

  // }

  render() {
    const { children } = this.props;
    const { currency, activeHeaderOption, cart } = this.state;
    const { setCurrency, setActiveHeaderOption } = this;

    return (
      <DataContext.Provider
        value={{
          currency,
          activeHeaderOption,
          cart,
          setCurrency,
          setActiveHeaderOption,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;

export { DataProvider };

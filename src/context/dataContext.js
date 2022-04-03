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
  setCart = (type, item) => {
    // compare cart items
    const CompareCartItems = (item, elem) => {
      return JSON.stringify(item) === JSON.stringify(elem);
    };

    var newCart = [...this.state.cart];
    const { id, name, atts, count } = item;

    switch (type) {
      case "Add":
        // check if the item already in the cart

        var alreadyExist = false;

        for (let i = 0; i < newCart?.length; i++) {
          const current = newCart[i];
          if (current?.id === id && current?.name === name) {
            const cmpAtts = CompareCartItems(atts, current?.atts);
            if (cmpAtts === true) alreadyExist = true;
          }
        }

        if (alreadyExist === false) {
          var newItem = Object.assign({}, item);
          newCart?.push(newItem);
          this.setState({ cart: newCart });
          return;
        } else {
          // locate the item and increment it
          for (let i = 0; i < newCart?.length; i++) {
            const currentItem = newCart[i];
            if (
              currentItem?.id === id &&
              currentItem?.name === name &&
              CompareCartItems(currentItem?.atts, atts)
            ) {
              currentItem.count += count;
              this.setState({ cart: newCart });
              return;
            }
          }
          return;
        }

      case "Remove":
        var idx;

        for (let i = 0; i < newCart?.length; i++) {
          const current = newCart[i];

          if (current?.id === id && current?.name === name) {
            const cmpAtts = CompareCartItems(atts, current?.atts);
            if (cmpAtts === true) {
              // if the item has more than one in cart, just decrease one
              if (current?.count > 1) {
                current.count -= 1;
                this.setState({ cart: newCart });
                return;
              } else {
                // if the item has one in cart, remove the item
                idx = i;
                break;
              }
            }
          }
        }
        if (idx > -1) {
          newCart?.splice(idx, 1);
        }
        this.setState({ cart: newCart });
        return;
      default:
        console.log("Invalid type", type);
    }
  };

  render() {
    const { children } = this.props;
    const { currency, activeHeaderOption, cart } = this.state;
    const { setCurrency, setActiveHeaderOption, setCart } = this;

    console.log(cart);

    return (
      <DataContext.Provider
        value={{
          currency,
          activeHeaderOption,
          cart,
          setCurrency,
          setActiveHeaderOption,
          setCart,
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;

export { DataProvider };

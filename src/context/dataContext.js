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

      return JSON.stringify(item) == JSON.stringify(elem)

    }
 
    var newCart = [...this.state.cart]

    switch(type){
      case "Add":
        // check if the item already in the cart
        const {id, name, atts} = item

        var alreadyExist = false

        for(let i = 0; i < newCart?.length; i++){
          const current = newCart[i]
          if(current?.id === id && current?.name === name ){
            const cmpAtts = CompareCartItems(atts, current?.atts);
            if(cmpAtts === true) alreadyExist = true
          }
        }

        if(alreadyExist === false){
          var newItem = Object.assign({}, item)
          newItem.count = 1
          newCart?.push(newItem)
          this.setState({cart: newCart})
          return
        }else{
          // locate the item and increment it
          for(let i = 0; i < newCart?.length; i++){
            const currentItem = newCart[i]
            if(currentItem?.id === id && currentItem?.name === name && CompareCartItems(currentItem?.atts, atts) ){
                currentItem.count = currentItem.count + 1
              this.setState({cart: newCart})
              return
            }
          }
          return
        }

      default:
        console.log("Invalid type", type)
    }
    
  }

  render() {
    const { children } = this.props;
    const { currency, activeHeaderOption, cart } = this.state;
    const { setCurrency, setActiveHeaderOption, setCart } = this;

    return (
      <DataContext.Provider
        value={{
          currency,
          activeHeaderOption,
          cart,
          setCurrency,
          setActiveHeaderOption,
          setCart
        }}
      >
        {children}
      </DataContext.Provider>
    );
  }
}

export default DataContext;

export { DataProvider };

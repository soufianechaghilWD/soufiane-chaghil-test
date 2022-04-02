import React, { Component } from "react";
import Header from "../../components/Header";
import DataContext from "../../context/dataContext";
import "../../styles/Cart.css";

class Index extends Component {
  static contextType = DataContext;

  render() {
    const { cart, setCart, currency } = this.context;

    const { label, symbol } = currency;

    return (
      <div className="cart">
        <Header />
        <div className="cart_body">
          <h1>Cart</h1>
          <div className="cart__products">
            {cart?.map((product, idx) => {
              const { name, brand, id, prices, gallery, attributes, atts } =
                product;

              const price = prices.filter(
                (pr) => pr?.currency?.label === label
              )[0].amount;

              return (
                <div className="cart__product" key={id + idx}>
                  <p>{brand}</p>
                  <p>{name}</p>
                  <h3>{symbol + price}</h3>
                  <div className="cart__products__atts">
                    {attributes?.map((att, attidx) => {
                      const { type, items } = att;
                      return (
                        <div className="att_container" key={attidx + "attidx"}>
                          {items?.map((item, itidx) => {
                            const { value } = item;
                            const selected =
                              atts[attidx]?.value?.value === value;
                            return (
                              <div
                                className={
                                  selected
                                    ? type === "text"
                                      ? "selectedAttItem att_item"
                                      : "selectedAttItemSw att_item"
                                    : "att_item"
                                }
                                style={{background: type === "text" ? "" : `${value}`}}
                                key={itidx}
                              >
                                {type === "text" && value}
                              </div>
                            );
                          })}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

import React, { Component } from "react";
import Header from "../../components/Header";
import DataContext from "../../context/dataContext";
import "../../styles/Cart.css";
import Pics from "./Pics";

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
              const {
                name,
                brand,
                id,
                prices,
                gallery,
                count,
                attributes,
                atts,
              } = product;

              const price = prices.filter(
                (pr) => pr?.currency?.label === label
              )[0].amount;

              return (
                <div className="cart__product" key={id + idx}>
                  <div className="cart_pro_inf">
                    <h3>{brand}</h3>
                    <p>{name}</p>
                    <h5>{symbol + price}</h5>
                    <div className="cart__products__atts">
                      {attributes?.map((att, attidx) => {
                        const { type, items } = att;
                        return (
                          <div
                            className="att_container"
                            key={attidx + "attidx"}
                          >
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
                                  style={{
                                    background:
                                      type === "text" ? "" : `${value}`,
                                  }}
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
                  <div className="cart_pro_actionsPics">
                    <div className="cart_actions">
                      <div
                        className="cart_add"
                        onClick={() => {
                          const newIt = Object.assign({}, product);
                          newIt.count = 1;
                          setCart("Add", newIt);
                        }}
                      >
                        +
                      </div>
                      <div>{count}</div>
                      <div
                        className="cart_remove"
                        onClick={() => {
                          const newIt = Object.assign({}, product);
                          newIt.count = 1;
                          setCart("Remove", newIt);
                        }}
                      >
                        -
                      </div>
                    </div>
                    <Pics gallery={gallery} />
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

import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataContext from "../context/dataContext";
import "../styles/Overlay.css";
import Attributes from "./Attributes";

class CartOverlay extends Component {
  static contextType = DataContext;

  constructor(props) {
    super(props);

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
    const { cart, currency, setCart } = this.context;

    const { symbol, label } = currency;

    const total = cart
      ?.map(
        (ele) =>
          ele?.prices?.filter((pr) => pr.currency.label === label)[0]?.amount *
          ele?.count
      )
      ?.reduce((a, b) => a + b, 0);

    return (
      <section className="cart_overlay">
        <div className="cart_overlay_body" ref={this.wrapperRef}>
          <h2>
            My bag, <span>{cart?.length} items</span>
          </h2>
          <div className="cart_overlay_products">
            {cart?.map((product, idx) => {
              const {
                id,
                count,
                name,
                brand,
                prices,
                atts,
                attributes,
                gallery,
              } = product;
              const price = prices?.filter(
                (pr) => pr?.currency?.label === label
              )[0].amount;

              return (
                <div className="cart_overlay_product" key={id + idx}>
                  <div className="overlay_product_info">
                    <p>{brand}</p>
                    <p>{name}</p>
                    <h3>{symbol + price}</h3>
                    <div className="overlay__atts">
                      <Attributes
                        attributes={attributes}
                        atts={atts}
                        overlay={true}
                      />
                    </div>
                  </div>
                  <div className="overlay_product_actions">
                    <div
                      className="add"
                      onClick={() => {
                        const newIt = Object.assign({}, product);
                        newIt.count = 1;
                        setCart("Add", newIt);
                      }}
                    >
                      +
                    </div>
                    <div className="count">{count}</div>
                    <div
                      className="remove"
                      onClick={() => {
                        const newIt = Object.assign({}, product);
                        newIt.count = 1;

                        setCart("Remove", newIt);
                      }}
                    >
                      -
                    </div>
                  </div>
                  <div className="overlay_product_pic">
                    <img src={gallery[0]} alt="OverlayPic" />
                  </div>
                </div>
              );
            })}
          </div>
          <div className="cart_overlay_total">
            <p>Total</p>
            <p>{symbol + total}</p>
          </div>
          <div className="cart_overlay_btns">
            <Link to="/cart" className="cart_overlay_view_page">
              <p className="view_page_content">VIEW BAG</p>
            </Link>
            <button className="checkout">CHECK OUT</button>
          </div>
        </div>
      </section>
    );
  }
}

export default CartOverlay;

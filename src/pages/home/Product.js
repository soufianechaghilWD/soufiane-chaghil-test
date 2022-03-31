import React, { Component } from "react";
import { Link } from "react-router-dom";
import DataContext from "../../context/dataContext";
import CircleCart from "../../files/circleCart.svg";

class Product extends Component {
  state = {
    hoverInside: false,
  };

  static contextType = DataContext;

  getDefaultAttrs = (attributes) => {
    const atts = [];
    for (let i = 0; i < attributes?.length; i++) {
      const { id, name, items, type } = attributes[i];
      const signleAtt = { id: id, name: name, type: type, value: items[0] };
      atts.push(signleAtt);
    }
    return atts;
  };

  render() {
    const { id, pic, name, symbol, amount, attributes } = this.props;

    const { hoverInside } = this.state;

    const defaultAtts = this.getDefaultAttrs(attributes);

    const { setCart } = this.context;

    return (
      <div
        className="home__product"
        onMouseEnter={() => this.setState({ hoverInside: true })}
        onMouseLeave={() => this.setState({ hoverInside: false })}
      >
        <Link to={"/product?id=" + id}>
          <img src={pic} alt="productPic" className="productPic" />
        </Link>
        {hoverInside === true && (
          <img
            className="circleCart"
            src={CircleCart}
            alt="Hover inside"
            onClick={() => {
              const item = {
                id,
                name,
                atts: defaultAtts,
                price: amount,
              };

              setCart("Add", item);
            }}
          />
        )}
        <Link to={"/product?id=" + id}>
          <p className="home_product_name">{name}</p>
          <p>{symbol + amount}</p>
        </Link>
      </div>
    );
  }
}

export default Product;
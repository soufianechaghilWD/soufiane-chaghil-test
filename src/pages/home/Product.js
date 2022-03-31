import React, { Component } from "react";
import { Link } from "react-router-dom";
import CircleCart from "../../files/circleCart.svg";

class Product extends Component {
  state = {
    hoverInside: false,
  };

  render() {
    const { id, pic, name, symbol, amount } = this.props;

    const { hoverInside } = this.state;

    return (
      <Link
        to={"/product?id=" + id}
        className="home__product"
        onMouseEnter={() => this.setState({ hoverInside: true })}
        onMouseLeave={() => this.setState({ hoverInside: false })}
      >
        <img src={pic} alt="productPic" className="productPic" />
        {hoverInside === true && (
          <img className="circleCart" src={CircleCart} alt="Hover inside" onClick={() => {
              // Add to cart
          }} />
        )}
        <p className="home_product_name">{name}</p>
        <p>{symbol + amount}</p>
      </Link>
    );
  }
}

export default Product;

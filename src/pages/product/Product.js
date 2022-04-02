import React, { Component } from "react";
import DataContext from "../../context/dataContext";
import Attributes from "./Attributes";
import Pics from "./Pics";

class Product extends Component {
  state = {
    pic: "",
    atts: [],
  };

  static contextType = DataContext;

  componentDidMount() {

    const {gallery} = this.props.product
    const firstPic = gallery[0];
    const attributes = [...this.props.product.attributes]
    const defaultAtts = this.getDefaultAttrs(attributes);
    this.setState({ pic: firstPic, atts: defaultAtts });
  }

  setPic = (newPic) => {
    this.setState({ pic: newPic });
  };

  getDefaultAttrs = (attributes) => {
    const atts = [];
    for (let i = 0; i < attributes?.length; i++) {
      const { id, name, type } = attributes[i];
      const items = [...attributes[i].items]
      const signleAtt = { id: id, name: name, type: type, value: items[0] };
      atts.push(signleAtt);
    }
    return atts;
  };

  setAtts = (changedAtt) => {
    var newAtts = [];
    for(let i = 0; i < this.state.atts.length; i++){
      const tmp = Object.assign({}, this.state.atts[i])
      newAtts.push(tmp)
    }
    const { id, type, name, value } = changedAtt;

    for (let i = 0; i < newAtts?.length; i++) {
      const current = newAtts[i];

      if (
        current?.id === id &&
        current?.type === type &&
        current?.name === name
      ) {
        current.value = value;
        this.setState({ atts: newAtts });
        return;
      }
    }

  };

  render() {
    const { id, gallery, brand, description, attributes, name, prices } =
      this.props.product;

    const { currency, setCart } = this.context;
    const { label, symbol } = currency;

    const price = prices?.filter((pr) => pr?.currency?.label === label)[0]
      ?.amount;

    const { pic, atts } = this.state;

    return (
      <div className="product__body">
        <Pics pics={gallery} setPic={this.setPic} />
        <img src={pic} alt="ShownPicture" />
        <div className="product__info">
          <h1>{brand}</h1>
          <p>{name}</p>
          {/* attributes */}
          <Attributes atts={attributes} choosed={atts} setAtts={this.setAtts} />
          <h3>PRICE:</h3>
          <h2>{symbol + price}</h2>
          <button
            onClick={() => {
              setCart("Add", { id, name, atts, count: 1, prices, brand, attributes, pic: gallery[0] });
            }}
          >
            ADD TO CART
          </button>
          <div
            className="product__info__desc"
            dangerouslySetInnerHTML={{ __html: description }}
          ></div>
        </div>
      </div>
    );
  }
}

export default Product;

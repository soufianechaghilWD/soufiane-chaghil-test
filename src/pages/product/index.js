import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import Header from "../../components/Header";
import { get_product_query } from "../../queries";
import Product from "./Product";
import "../../styles/Product.css";

class Index extends Component {
  state = {
    product_id: "",
  };


  componentDidMount() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const product_id = urlParams.get("id");
    this.setState({ product_id: product_id });
  }

  render() {
    const { product_id } = this.state;


    
    return (
      <div className="product">
        <Header />
        {product_id !== "" && (
          <Query query={get_product_query(product_id)}>
            {({ loading, data }) => {
              if (loading) return <h6>loading</h6>;

              const { product } = data;


              return <Product product={product} />;
            }}
          </Query>
        )}
      </div>
    );
  }
}

export default Index;

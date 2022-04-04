import { Query } from "@apollo/client/react/components";
import React, { Component } from "react";
import Filters from "../../components/Filters";
import Header from "../../components/Header";
import DataContext from "../../context/dataContext";
import { get_products_in_category } from "../../queries";
import "../../styles/Home.css";
import Product from "./Product";

class Index extends Component {
  state = {
    filters: [],
  };

  setFilters = (filters) => {
    this.setState({ filters });
  };

  static contextType = DataContext;

  render() {
    const { currency, activeHeaderOption } = this.context;

    const {filters} = this.state
    const {setFilters} = this

    return (
      <div className="home">
        <Header />
        <div className="home__body">
          <h1>{activeHeaderOption.toUpperCase()}</h1>
          <div className="home__products">
            <Query query={get_products_in_category(activeHeaderOption)}>
              {({ loading, data }) => {
                if (loading === true) return <h6>Loading</h6>;

                const { products } = data?.category;

                return (
                  <>
                    <Filters filters={filters} setFilters={setFilters} products={products} />
                    <div className="home__product__container">
                      {products?.map((product, idx) => {
                        const { gallery, id, name, prices, attributes, brand } =
                          product;

                        const { label, symbol } = currency;

                        const price = prices?.filter(
                          (ele) => ele?.currency?.label === label
                        )[0];

                        const { amount } = price;

                        return (
                          <Product
                            id={id}
                            gallery={gallery}
                            name={name}
                            symbol={symbol}
                            amount={amount}
                            key={idx + id}
                            attributes={attributes}
                            prices={prices}
                            brand={brand}
                          />
                        );
                      })}
                    </div>
                  </>
                );
              }}
            </Query>
          </div>
        </div>
      </div>
    );
  }
}

export default Index;

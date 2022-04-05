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


  setFilters = (filter) => {
    const newFilters = []
    for(let i = 0; i < this.state?.filters?.length; i++){
      const crt = this.state?.filters[i]
      const newObj = Object.assign({}, crt)
      newFilters.push(newObj)
    }
    const existedFil = newFilters?.filter(fl => fl?.name === filter?.name)
    if(existedFil?.length === 0) newFilters.push(filter)
    else{
      if(existedFil[0]?.selected !== filter?.selected) existedFil[0].selected = filter?.selected
      else{
        var idx = -1;
        for(let i =0; i < newFilters.length; i++){
          const crt = newFilters[i]
          if(crt?.name === filter?.name) idx = i
        }
        if(idx > -1){
          newFilters.splice(idx, 1)
        }
      }
    }
    this.setState({filters: newFilters})
  };

  clearFilters = () => {
    this.setState({filters: []})
  }

  static contextType = DataContext;

  render() {
    const { currency, activeHeaderOption } = this.context;

    const {filters} = this.state
    const {setFilters, clearFilters} = this


    return (
      <div className="home">
        <Header />
        <div className="home__body">
          <h1>{activeHeaderOption.toUpperCase()}</h1>
          <div className="home__products">
            <Query query={get_products_in_category(activeHeaderOption)}>
              {({ loading, data }) => {
                if (loading === true) return <h6>Loading</h6>;


                var products = [];
                if(filters?.length === 0) products = data?.category?.products
                else{
                  var tmpPrds = data?.category?.products
                  for(let i = 0; i < tmpPrds?.length; i++){
                    const prd = tmpPrds[i]
                    if(filters?.every(fl => prd?.attributes?.some(x => x?.name === fl.name))) products.push(prd)
                  }
                }

                return (
                  <>
                    <Filters filters={filters} setFilters={setFilters} clearFilters={clearFilters} products={products} />
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

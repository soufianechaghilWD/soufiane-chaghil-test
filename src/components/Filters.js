import React, { Component } from "react";
import "../styles/Filters.css";

class Filters extends Component {
  state = {
    shownFilters: [],
  };

  componentDidMount() {
    const { products } = this.props;
    const filters = [];
    for (let i = 0; i < products?.length; i++) {
      const { attributes } = products[i];

      for (let j = 0; j < attributes?.length; j++) {
        const { name, id } = attributes[j];
        const exist = filters?.some((x) => x?.name === name && x?.id === id);
        if (!exist) filters?.push(attributes[j]);
      }
    }
    this.setState({ shownFilters: filters });
  }

  render() {
    const { shownFilters } = this.state;

    return (
      <div className="filters">
        <h4>Filters </h4>
        <div className="filters__container">
          {shownFilters?.map((filter, filertIdx) => {
            const { name, items } = filter;

            return (
              <div className="filter" key={filertIdx + "filter"}>
                <h6>{name}</h6>
                <div className="filter__items">
                  {items?.map((item, idx) => {
                    const { value } = item;

                    return <div key={idx + "item"}>{value}</div>;
                  })}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Filters;

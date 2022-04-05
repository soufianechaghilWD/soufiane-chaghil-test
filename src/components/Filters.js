import React, { Component } from "react";
import "../styles/Filters.css";

class Filters extends Component {
  render() {
    const { products, setFilters, clearFilters, filters } = this.props;
    const shownFilters = [];
    for (let i = 0; i < products?.length; i++) {
      const { attributes } = products[i];

      for (let j = 0; j < attributes?.length; j++) {
        const { name, id } = attributes[j];
        const exist = shownFilters?.some(
          (x) => x?.name === name && x?.id === id
        );
        if (!exist) shownFilters?.push(attributes[j]);
      }
    }

    return (
      <div className="filters">
        <div className="filters__header">
          <h4>FILTERS: </h4>
          <h6
            className="clear_filters"
            onClick={() => {
              clearFilters();
            }}
          >
            Clear Filters
          </h6>
        </div>
        <div className="filters__container">
          {shownFilters?.map((filter, filertIdx) => {
            const { name, items, type } = filter;

            const YesNo =
              items?.length === 2 &&
              (items[0]?.value === "Yes" || items[0]?.value === "No");

            const YesNoSelected =
              filters?.filter((fl) => fl?.name === name)?.length > 0;

            const selectValue = filters?.filter((fl) => fl?.name === name)[0]
              ?.selected;

            return (
              <div className="filter" key={filertIdx + "filter"}>
                <h6>{name}</h6>
                {type === "swatch" ? (
                  <div className="filter__items__swatch">
                    {items?.map((item, idx) => {
                      const { value } = item;
                      const selected =
                        filters?.filter((fl) => fl?.selected === value).length >
                        0;

                      return (
                        <div
                          key={idx + "item"}
                          style={{ background: `${value}` }}
                          onClick={() => {
                            setFilters({ name, type, selected: value });
                          }}
                          className={
                            selected ? "filter__items__swatch__selected" : ""
                          }
                        ></div>
                      );
                    })}
                  </div>
                ) : YesNo ? (
                  <div className="filter__items__Y/N">
                    <input
                      name={name}
                      type="checkbox"
                      checked={YesNoSelected}
                      onChange={() => {
                        setFilters({ name, type, selected: "YesNoVal" });
                      }}
                    />
                  </div>
                ) : (
                  <div className="filter__items__other">
                    <select
                      value={selectValue}
                      onChange={(e) => {
                        const val = e.target.value;
                        setFilters({ name, type, selected: val });
                      }}
                    >
                      {items?.map((item, idx) => {
                        const { value } = item;

                        return (
                          <option key={idx} value={value}>
                            {value}
                          </option>
                        );
                      })}
                    </select>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Filters;

import React, { Component } from "react";
import DataContext from "../context/dataContext";
import { Query } from "@apollo/client/react/components";
import { get_categories_query } from "../queries";
import '../styles/HeaderItems.css'

class HeaderItems extends Component {
  static contextType = DataContext;

  render() {
    const { activeHeaderOption, setActiveHeaderOption } = this.context;

    return (
      <div className="headerItems">
        <Query query={get_categories_query()}>
          {({ loading, data }) => {
            // if it is still loading
            if (loading) return <h6>Loading</h6>;

            // return the categories
            const { categories } = data;
            return (
              <ul>
                {categories?.map((ele, idx) => {
                  const { name } = ele;
                  return (
                    <li
                      key={"item" + idx}
                      onClick={() => setActiveHeaderOption(name)}
                      className={`header_item ${
                        activeHeaderOption === name ? "active_header_item" : ""
                      }`}
                    >
                      {name.toUpperCase()}
                    </li>
                  );
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default HeaderItems;

import React, { Component } from "react";
import "../styles/Attributes.css";

class Attributes extends Component {
  render() {
    const { attributes, atts, overlay, setAtts } = this.props;

    return (
      <div>
        {attributes?.map((attribute, attIdx) => {
          const { items, type, id, name } = attribute;

          return (
            <div key={attIdx + "SingleAtt"} className="attribute">
              {items?.map((item, itemIdx) => {
                const { value } = item;
                const selected = atts[attIdx]?.value?.value === value;

                var className = `att_item ${
                  selected === true ? "selected_att_item" : ""
                } ${overlay === true ? "att_item_overlay" : ""} ${
                  type !== "text" ? "att_item_swi" : ""
                } ${
                  selected === true && type === "text"
                    ? "selected_not_swatch"
                    : ""
                }`;

                if (setAtts) {
                  className = `prod__att ${
                    selected
                      ? "prod_att__selected"
                      : "prod_att__selected__unselected"
                  } {type !== "text" ? "prod_att__sw" : ""}`;
                }

                return (
                  <div
                    key={itemIdx + "item"}
                    className={className}
                    style={{ background: type !== "text" ? `${value}` : "" }}
                    onClick={() => {
                      if (setAtts && selected === false) {
                        setAtts({ name, id, type, value: item });
                      }
                    }}
                  >
                    {type === "text" && value}
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    );
  }
}

export default Attributes;

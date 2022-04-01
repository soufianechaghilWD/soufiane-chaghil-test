import React, { Component } from "react";

class Attributes extends Component {

    
  render() {
    const { atts, choosed, setAtts } = this.props;
    return (
      <div className="atts">
        {choosed?.length > 0 &&
          atts?.map((att, idxAtt) => {
            const { id, name, type, items } = att;

            return (
              <div key={idxAtt + "big"} className="singleAtt">
                <p>{name.toUpperCase()}:</p>
                <div>
                  {items?.map((item, idx) => {
                    const { value } = choosed[idxAtt];
                    if (JSON.stringify(item) === JSON.stringify(value)) {
                      return (
                        <div
                          style={{
                            background:
                              type === "swatch" ? `${item?.value}` : "",
                            color: type === "swatch" ? `${item?.value}` : "",
                          }}
                          key={idx + "sm"}
                          className="att choosen"
                        >
                          {item?.displayValue}
                        </div>
                      );
                    } else
                      return (
                        <div
                          style={{
                            background:
                              type === "swatch" ? `${item?.value}` : "",
                            color: type === "swatch" ? `${item?.value}` : "",
                          }}
                          key={idx + "sm"}
                          className="att unchoosen"
                          onClick={() => {setAtts({name, type, id, value: item})}}
                        >
                          {item?.displayValue}
                        </div>
                      );
                  })}
                </div>
              </div>
            );
          })}
      </div>
    );
  }
}

export default Attributes;

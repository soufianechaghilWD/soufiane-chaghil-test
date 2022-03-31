import React, { Component } from "react";
import { Query } from "@apollo/client/react/components";
import { get_currency_query } from "../queries";
import DataContext from "../context/dataContext";

class CurrencyDropDown extends Component {

    static contextType = DataContext

  constructor(props) {
    super(props);

    this.wrapperRef = React.createRef();
    this.setWrapperRef = this?.setWrapperRef?.bind(this);
    this.handleClickOutside = this?.handleClickOutside?.bind(this);
  }

  componentDidMount() {
    document.addEventListener("mousedown", this?.handleClickOutside);
  }

  componentWillUnmount() {
    document?.removeEventListener("mousedown", this?.handleClickOutside);
  }

  handleClickOutside(event) {
    if (
      this?.wrapperRef &&
      !this?.wrapperRef?.current?.contains(event?.target)
    ) {
      this?.props?.setOpenCurrencyDropDown();
    }
  }

  render() {

    const {currency, setCurrency} = this.context

    const ChangeCurrency = (newCurrency) => {
        if(newCurrency?.label !== currency?.label){
            setCurrency(newCurrency)
            this.props.setOpenCurrencyDropDown()
        }
    }

    return (
      <div className="currency_drop_down" ref={this.wrapperRef}>
        <Query query={get_currency_query()}>
          {({ loading, data }) => {
            if (loading) return <h6>Loading</h6>;

            const { currencies } = data;
            return (
              <ul>
                {currencies?.map((currency, idx) => {
                  const { symbol, label } = currency;

                  return <li key={idx + "currency"} onClick={() => ChangeCurrency({symbol, label})} >{symbol + " " + label}</li>;
                })}
              </ul>
            );
          }}
        </Query>
      </div>
    );
  }
}

export default CurrencyDropDown;

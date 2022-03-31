import { gql } from "@apollo/client";

export const get_categories_query = () => {
  return gql`
    query {
      categories {
        name
      }
    }
  `;
};
export const get_currency_query = () => {
  return gql`
    query {
      currencies {
        label
        symbol
      }
    }
  `;
};

export const get_products_in_category = (active_item) => {
  return gql`
    query {
        category(input: { title: "${active_item}" }) {
          name
          products {
            id
            name
            gallery
            prices {
              currency {
                label
                symbol
              }
              amount
            }
            attributes{
              id
                name
              type
              items{
                displayValue
                value
                id
              }
            }
          }
        }
      }`;
};

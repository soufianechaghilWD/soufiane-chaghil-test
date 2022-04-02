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
            brand
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

export const get_product_query = (product_id) => {
  return gql`
  query{
    product(id: "${product_id}"){
    id
    name
    inStock
    gallery
    description
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
    prices{
        currency{
          label
            symbol
        }
          amount
      }
    brand
  }
}`;
};

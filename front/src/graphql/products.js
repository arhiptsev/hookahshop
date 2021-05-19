import gql from 'graphql-tag';

export const ADD_TO_CART_QUERY = gql`
  mutation addToCart($id: Float!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export const GET_CAREGORY = gql`
  query category($id: Float!) {
    category(id: $id) {
      products {
        id
        name
        desc
        price
        count
      }
    }
  }
`;

export const GET_All_PRODUCTS = gql`
  query products {
    products {
      id
      name
      desc
      price
      count
    }
  }
`;

import gql from 'graphql-tag';

export const CREATE_ORDER = gql`
  mutation createOrderFromCart {
    createOrderFromCart {
      id
    }
  }
`;

export const REMOVE_FROM_CART = gql`
  mutation removeFromCart($id: Float!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

export const GET_CART = gql`
  query getCart {
    cart {
      id
      count
      product {
        id
        name
        price
      }
    }
  }
`;

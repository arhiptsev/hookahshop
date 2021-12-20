import gql from 'graphql-tag';

export const ADD_TO_CART_QUERY = gql`
  mutation addToCart($id: Float!) {
    addToCart(productId: $id) {
      id
    }
  }
`;

export const GET_CAREGORY_WITH_PRODUCTS = gql`
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

export const GET_CAREGORY = gql`
  query category($id: Float!) {
    category(id: $id) {
      id
      name
    }
  }
`;

export const GET_CAREGORIES_QUERY = gql`
  query categories {
    categories {
      id
      name
    }
  }
`;

export const PRODUCTS_SUBSCRIPTION = gql`
  subscription productsUpdated {
    productsUpdated {
      id
      name
      desc
      price
      count
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

export const CREATE_PRODUCT_MUTATION = gql`
  mutation createProduct($payload: ProductInput!) {
    createProduct(payload: $payload) {
      id
    }
  }
`;

export const DELETE_PRODUCT_MUTATION = gql`
  mutation deleteProduct($id: Int!) {
    deleteProduct(id: $id) {
      id
    }
  }
`;

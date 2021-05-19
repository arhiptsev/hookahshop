import gql from 'graphql-tag';

export const GET_ORDERS = gql`
  query orders {
    orders {
      id
      created_at
      items {
        count
      }
    }
  }
`;

export const DELETE_ORDER = gql`
  mutation removeOrder($id: Float!) {
    removeOrder(id: $id)
  }
`;

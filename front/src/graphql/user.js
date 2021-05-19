import gql from 'graphql-tag';

export const REGISRATION = gql`
  mutation registration($username: String!, $password: String!) {
    registration(username: $username, password: $password) {
      isSuccess
    }
  }
`;

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login (username: $username, password: $password) {
      access_token
    }
  }
`;
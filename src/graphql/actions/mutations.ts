import gql from "graphql-tag";
import { USER_FRAGMENT } from "./fragments";

export const LOGIN = gql`
  mutation Login($input: LoginWithGoogleInput!) {
    login(input: $input) {
      ...UserFragment
    }
  }

  ${USER_FRAGMENT}
`;

export const LOGOUT = gql`
  mutation Logout {
    logout
  }
`;

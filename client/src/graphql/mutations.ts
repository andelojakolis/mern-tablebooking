import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
mutation CreateUser($input: CreateUserInput!) {
    createUser(input: $input) {
      email
      _id
      name
    }
  }
`;

export const LOGIN_USER = gql`
mutation LoginUser($input: LoginInput!) {
  login(input: $input)
}`
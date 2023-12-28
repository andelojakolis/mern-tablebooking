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
mutation login($input: LoginInput!) {login(input: $input) {token userId}}`

export const CREATE_RESERVATION = gql`
mutation CreateReservation($input: CreateReservationInput!){
  createReservation(input: $input){
    date
    mealType
  }
}`
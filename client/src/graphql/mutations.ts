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

export const CREATE_RESERVATION = gql`
mutation CreateReservation($input: CreateReservationInput!){
  createReservation(input: $input){
    date
    mealType
  }
}`

export const CHECK_AVAILABILITY = gql`
query getReservations($input: GetReservationInput!) {
	getReservations(input: $input)
}`
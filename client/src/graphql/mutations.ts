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

export const CANCEL_RESERVATION = gql`
mutation CancelReservation($input: CancelReservationInput!){
  cancelReservation(input: $input)
}`

export const CREATE_REVIEW = gql`
mutation CreateReview($input: CreateReviewInput!){
  createReview(input: $input){
    reviewerID
    reviewer
    reviewDescription
    rating
  }
}`

export const DELETE_REVIEW = gql`
mutation deleteReview($input: DeleteReviewInput!) {
  deleteMyReview(input: $input)
}`

export const EDIT_REVIEW = gql`
mutation updateReview($input: UpdateReviewInput!){
  updateMyReview(input: $input){
    reviewerID
    reviewer
    reviewDescription
    rating
  }
}`

export const CANCEL_RESERVATION_ADMIN = gql`
mutation CancelReservationAdmin($input: CancelReservationInput!){
  cancelReservationAdmin(input: $input)
}`
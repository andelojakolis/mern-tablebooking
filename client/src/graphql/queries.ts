import { gql } from "@apollo/client";

export const CHECK_AVAILABILITY = gql`
query getReservations($input: GetReservationInput!) {
	getReservations(input: $input)
}`

export const IS_MY_TABLE = gql`
query findMyReservations($input: GetMyReservationInput!) {
	findMyReservations(input: $input)
}`

export const GET_USER_INFO = gql`
query getUserInfo($input: GetUserInfoInput!) {
	getUserInfo(input: $input) {_id name email role reserved cancelled}
}`

export const GET_LAST_THREE = gql`
query {
	getLastReviews {
	  _id
	  reviewer
	  reviewDescription
	  rating
	  createdAt
	  isEdited
	}
}`

export const GET_PAGINATED_REVIEWS  = gql`
query getPaginatedReviews($input: PaginationInput!){
	getAllReviews(input: $input) {
	  _id
	  reviewer
	  reviewDescription
	  rating
	  createdAt
	  isEdited
	}
}`
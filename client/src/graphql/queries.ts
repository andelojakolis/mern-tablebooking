import { gql } from "@apollo/client";

export const CHECK_AVAILABILITY = gql`
query getReservations($input: GetReservationInput!) {
	getReservations(input: $input)
}`

export const IS_MY_TABLE = gql`
query findMyReservations($input: GetMyReservationInput!) {
	findMyReservations(input: $input)
}`

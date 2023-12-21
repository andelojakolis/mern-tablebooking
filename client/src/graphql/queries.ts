import { gql } from "@apollo/client";

export const CHECK_AVAILABILITY = gql`
query getReservations($input: GetReservationInput!) {
	getReservations(input: $input)
}`
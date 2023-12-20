import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateReservationInput, GetReservationInput, Reservation
} from "../schema/reservation.schema";
import ReservationService from "../service/reservation.service";
import Context from "../types/context";

@Resolver()
export default class ReservationResolver {
  constructor(private reservationService: ReservationService) {
    this.reservationService = new ReservationService();
  }

  @Authorized()
  @Mutation(() => Reservation)
  createReservation(
    @Arg("input") input: CreateReservationInput,
    @Ctx() context: Context
  ) {
    const user = context.user!;
    return this.reservationService.createReservation({ ...input, user });
  }

  //@Authorized()
  @Query(() => [Number])
  getReservations(@Arg("input") input: GetReservationInput) {
    return this.reservationService.getReservations(input);
  }
}
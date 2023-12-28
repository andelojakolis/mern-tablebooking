import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateReservationInput, GetReservationInput, Reservation, GetMyReservationInput
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

  @Query(() => [Number])
  getReservations(@Arg("input") input: GetReservationInput) {
    return this.reservationService.getReservations(input);
  }

  @Query(() => [Number])
  findMyReservations(@Arg("input") input: GetMyReservationInput) {
    return this.reservationService.findMyReservations(input);
  }
}
import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from "type-graphql";
import {
  CreateReservationInput, GetReservationsInput, Reservation
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
    console.log(user)
    return this.reservationService.createReservation({ ...input, user });
  }

  @Authorized()
  @Query(() => [Number])
  getReservations(
    @Arg("input") input: GetReservationsInput
  ) {
    console.log('nesto')
    return this.reservationService.getReservations(input);
  }

  // @Query(() => Product)
  // product(@Arg("input") input: GetProductInput) {
  //   return this.productService.findSingleProduct(input);
  // }
}
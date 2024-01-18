import { Arg, Query, Resolver } from "type-graphql";
import AdminService from "../service/admin.service";
import { GetReservationInput, Reservation } from "../schema/reservation.schema";

@Resolver()
export default class AdminResolver {
  constructor(private adminService: AdminService) {
    this.adminService = new AdminService();
  }

  @Query(() => Reservation)
  getReservationsAdmin(@Arg("input") input: GetReservationInput) {
    return this.adminService.getReservationWithUserInfo(input.date, input.mealType);
  }
}
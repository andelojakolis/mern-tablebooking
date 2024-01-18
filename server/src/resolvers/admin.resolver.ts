import { Arg, Query, Resolver } from "type-graphql";
import AdminService from "../service/admin.service";
import { GetMyReservationInput, Reservation } from "../schema/reservation.schema";
import UserService from "../service/user.service";
import { ApolloError } from "apollo-server";

@Resolver()
export default class AdminResolver {
  constructor(private adminService: AdminService, private userService: UserService) {
    this.adminService = new AdminService();
    this.userService = new UserService();
  }

  @Query(() => Reservation)
  async getReservationsAdmin(@Arg("input") input: GetMyReservationInput) {
    const user = await this.userService.getUserById({_id: input.myId});
    if(user?.role !== 'admin') {
        throw new ApolloError("You don't have admin authorization");
    }
    return this.adminService.getReservationWithUserInfo(input.date, input.mealType);
  }
}
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import AdminService from "../service/admin.service";
import { CancelReservationInput, GetMyReservationInput, Reservation } from "../schema/reservation.schema";
import UserService from "../service/user.service";
import { ApolloError } from "apollo-server";
import Context from "../types/context";

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

  @Mutation(() => String)
  cancelReservationAdmin(@Arg("input") input: CancelReservationInput,
  @Ctx() context: Context) {
    if(context.user?.role !== 'admin') {
      throw new ApolloError('You are not authorized!')
    }
    return this.adminService.cancelReservationAdmin(input);
  }
}
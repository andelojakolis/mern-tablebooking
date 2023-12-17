import UserResolver from "./user.resolver";
import ReservationResolver from "./reservation.resolver";

export const resolvers = [UserResolver, ReservationResolver] as const
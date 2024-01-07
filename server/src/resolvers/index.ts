import UserResolver from "./user.resolver";
import ReservationResolver from "./reservation.resolver";
import ReviewResolver from "./review.resolver";

export const resolvers = [UserResolver, ReservationResolver, ReviewResolver] as const
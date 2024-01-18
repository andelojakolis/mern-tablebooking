import UserResolver from "./user.resolver";
import ReservationResolver from "./reservation.resolver";
import ReviewResolver from "./review.resolver";
import AdminResolver from "./admin.resolver";

export const resolvers = [UserResolver, ReservationResolver, ReviewResolver, AdminResolver] as const
import { GetTablesInput, MakeReservationInput, ReservationModel } from "../schema/reservation.schema";
import { User } from "../schema/user.schema";

class ReservationService {
    async createReservation(input: MakeReservationInput & {user: User['_id']}) {
        return ReservationModel.create(input);
    }

    async getReservations(input: GetTablesInput) {
        return ReservationModel.find(); // 1:07
    }
}

export default ReservationService
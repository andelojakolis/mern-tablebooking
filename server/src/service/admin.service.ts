import { Reservation, ReservationModel, TableInfo } from "../schema/reservation.schema";
import { UserModel } from "../schema/user.schema";

class AdminService {
    async getReservationWithUserInfo(date: string, mealType: string): Promise<Reservation | null> {
        const reservation = await ReservationModel.findOne({ date, mealType });
    
        if (!reservation) {
            return null;
        }
    
        const tableInfoWithUserInfo = await Promise.all(
            reservation.tableInfo.map(async (tableInfo) => {
                const user = await UserModel.findById(tableInfo.user._id);
    
                if (user) {
                    return {
                        time: tableInfo.time,
                        persons: tableInfo.persons,
                        tableNumber: tableInfo.tableNumber,
                        user: {
                            _id: user._id,
                            name: user.name,
                            email: user.email,
                            role: user.role,
                            reserved: user.reserved,
                            cancelled: user.cancelled
                        },
                    };
                } else {
                    return null;
                }
            })
        );
    
        const filteredTableInfoWithUserInfo = tableInfoWithUserInfo.filter((info) => info !== null);
    
        const reservationWithUserInfo: Reservation = {
            _id: reservation._id,
            date: reservation.date,
            mealType: reservation.mealType,
            tableInfo: filteredTableInfoWithUserInfo as TableInfo[],
        };
    
        return reservationWithUserInfo;
    }  
}

export default AdminService;
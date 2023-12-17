import {
    CreateReservationInput, GetReservationsInput, Reservation, ReservationModel
  } from "../schema/reservation.schema";
  import { User } from "../schema/user.schema";
  
  class ReservationService {
    async createReservation(input: CreateReservationInput & { user: User }) {
      try {
        const { date, mealType } = input;
        const existingReservation = await ReservationModel.findOne({ date, mealType});
        if (existingReservation) {
          existingReservation.tableInfo.push({
            user: input.user,
            time: input.time,
            persons: input.persons,
            tableNumber: input.tableNumber,
          })
          await existingReservation.save();
          return existingReservation;
        } else {
          const newReservation = new ReservationModel({
            date,
            mealType,
            tableInfo: [
              {
                user: input.user,
                time: input.time,
                persons: input.persons,
                tableNumber: input.tableNumber
              },
            ],
          });

          await newReservation.save();
          return newReservation;
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    async getReservations(input: GetReservationsInput) {
      try {
        console.log(input)
        const { date, mealType } = input;
        const data = await ReservationModel.find({ date, mealType})
        console.log(data)
      } catch (error) {
        console.log(error)
      }
    }
  
    // async findSingleProduct(input: GetProductInput) {
    //   return ProductModel.findOne(input).lean();
    // }
  }
  
  export default ReservationService;
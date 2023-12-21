import { ApolloError } from "apollo-server";
import {
    CreateReservationInput, GetReservationInput, Reservation, ReservationModel
  } from "../schema/reservation.schema";
  import { User, UserModel } from "../schema/user.schema";
  
  class ReservationService {
    async createReservation(input: CreateReservationInput & { user: User }) {
      try {
        const { date, mealType } = input;
        const existingReservation = await this.getReservationsByDateAndMealType(date, mealType);
        const reservationDate = new Date(date).getDate();
        const now = new Date().getDate();
        if (reservationDate < now) {
          throw new ApolloError("Reservation date cannot be earlier than the current date.");
        }
        if (existingReservation) {
          const isTableNumberUsed = existingReservation.tableInfo.some(info => info.tableNumber === input.tableNumber);

          if (isTableNumberUsed) {
            throw new ApolloError('Table Number is already used in the existing reservation.');
          }
          existingReservation.tableInfo.push({
            user: input.user,
            time: input.time,
            persons: input.persons,
            tableNumber: input.tableNumber,
          })
          await existingReservation.save();
          this.incrementReservedCounter(input.user._id)
  
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
          this.incrementReservedCounter(input.user._id);
          return newReservation;
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    async getReservations(input: GetReservationInput) {
      try {
        const { date, mealType } = input;
        const data = await this.getReservationsByDateAndMealType(date, mealType);
        let tableNumberArray: number[] = [];

        if (!data) {
          return tableNumberArray; 
        }
        tableNumberArray = data.tableInfo.map(tableNumber => tableNumber.tableNumber);
        return tableNumberArray;
      } catch (error) {
        console.error('Error:', error);
        throw error;
      }
    }

    async getReservationsByDateAndMealType(date: string, mealType: string) {
      return ReservationModel.findOne({ date, mealType });
    }

    async incrementReservedCounter(userId: string) {
      await UserModel.findByIdAndUpdate(userId, { $inc: { reserved: 1 } });
    }
  }
  
  export default ReservationService;
import { ApolloError } from "apollo-server";
import {
    CreateReservationInput, GetReservationInput, GetMyReservationInput, ReservationModel, CancelReservationInput
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

  async incrementCancelCounter(userId: string) {
    await UserModel.findByIdAndUpdate(userId, { $inc: { cancelled: 1 } });
  }

  async findMyReservations(input: GetMyReservationInput) {
    const reservation = await this.getReservationsByDateAndMealType(input.date, input.mealType);
    
    let myReservationArray: number[] = [];
    if (!reservation) {
      return myReservationArray; 
    }

    myReservationArray = reservation.tableInfo
    .filter(table => table.user._id.toString() == input.myId)
    .map(filteredTable => filteredTable.tableNumber);

    return myReservationArray
  }

  async cancelReservation(input: CancelReservationInput & { user: User }) {
    const { date, mealType, tableNumber, user } = input;
    
    const result = await ReservationModel.updateOne({
      "date": date,
      "mealType": mealType,
      "tableInfo": {
        $elemMatch: {
          "tableNumber": tableNumber,
          "user": user._id,
        }
      }
    },
    {
      $pull: {
        "tableInfo": {
          "tableNumber": tableNumber,
        }
      }
    },)

    if(result.modifiedCount === 0) {
      throw new ApolloError('User does not match for the specified tableNumber');
    }

    this.incrementCancelCounter(user._id);
    return 'Reservation Cancelled'
  }
}

export default ReservationService;
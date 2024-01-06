import { getModelForClass, prop, Ref } from "@typegoose/typegoose";
import { Field, InputType, Int, ObjectType } from "type-graphql";
import { User } from "./user.schema";
import { IsString, Max, Min } from "class-validator";

@ObjectType()
export class Reservation {
  @Field(() => String)
  _id: string;

  @Field(() => String)
  @prop({required:true})
  date: string;

  @Field(() => String)
  @prop({required:true})
  mealType: string;

  @Field(() => [TableInfo])
  @prop({ type: () => [TableInfo], })
  tableInfo: TableInfo[];
}

@ObjectType()
export class TableInfo {
  @Field(() => User)
  @prop({  ref: () => User })
  user: User;

  @Field(() => String)
  @prop({required:true})
  time: string;

  @Field(() => Number)
  @prop({required:true})
  persons: number;

  @Field(() => Number)
  @prop({required:true})
  tableNumber: number;
}

export const ReservationModel = getModelForClass<typeof Reservation>(Reservation);

@InputType()
export class CreateReservationInput {
  @Field(() => Int)
  @Min(1)
  @Max(10)
  tableNumber: number;

  @Field()
  date: string;

  @Field()
  time: string;

  @Field(() => Int)
  @Min(1)
  @Max(4)
  persons: number;

  @Field()
  mealType: string;
}

@InputType()
export class GetReservationInput {
  @Field()
  @IsString()
  date: string;

  @Field()
  @IsString()
  mealType: string;
}

@InputType()
export class GetMyReservationInput {
  @Field()
  @IsString()
  date: string;

  @Field()
  @IsString()
  mealType: string;

  @Field()
  @IsString()
  myId: string;
}

@InputType()
export class CancelReservationInput {
  @Field(() => Int)
  @Min(1)
  @Max(10)
  tableNumber: number;

  @Field()
  @IsString()
  date: string;

  @Field()
  @IsString()
  mealType: string;
}
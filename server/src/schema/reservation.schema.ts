import { Ref, getModelForClass, prop } from "@typegoose/typegoose";
import { Field, InputType, ObjectType } from "type-graphql";
import { User } from "./user.schema";

@ObjectType()
export class Reservation {
    @Field(() => String)
    _id: string

    @Field(() => String)
    @prop({ required: true })
    date: string

    @Field(() => String)
    @prop({ required: true })
    mealType: string

    @Field(() => [TableInfo])
    @prop({ required: true })
    tableInfo: TableInfo[]
}

@ObjectType()
export class TableInfo {
    @Field(() => Number)
    @prop({ required: true })
    tableNumber: number

    @Field(() => String)
    @prop({ required: true })
    time: string

    @Field(() => String)
    @prop({ required: true, ref: () => User })
    user: Ref<User>

    @Field(() => Number)
    @prop({ required: true })
    persons: number
}

export const ReservationModel = getModelForClass<typeof Reservation>(Reservation)

@InputType()
export class MakeReservationInput {
    @Field()
    tableNumber: number

    @Field()
    date: string

    @Field()
    mealType: string

    @Field()
    time: string

    @Field()
    persons: number
}

// @InputType()
// export class GetMyReservationInput {
//     @Field()
//     userId: string;
// }   for cancelling reservation

@InputType()
export class GetTablesInput {
    @Field()
    date: string

    @Field()
    mealType: string
}
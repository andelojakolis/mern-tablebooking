import { prop } from "@typegoose/typegoose";
import { Field, ObjectType } from "type-graphql";

@ObjectType()
export class User {
    @Field(() => String) // graphql type
    _id: string // typescript type

    @Field(() => String)
    @prop({required: true})
    name: string

    @Field(() => String)
    @prop({required: true})
    email: string

    // for password we wont be using graphql type
    @prop({required: true})
    password: string
}
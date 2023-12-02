import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

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

export const UserModel = getModelForClass(User)

@InputType()
export class CreateUserInput {
    @Field(() => String)
    name: string

    @IsEmail()
    @Field(() => String)
    email: string

    @MinLength(6, {
        message: 'password must be at least 6 characters long'
    })
    @MaxLength(50, {
        message: 'password must not be longer than 50 characters'
    })
    @Field(() => String)
    password: string
}
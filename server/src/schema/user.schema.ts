import { getModelForClass, pre, prop } from "@typegoose/typegoose";
import bcrypt from 'bcrypt';
import { IsEmail, MaxLength, MinLength } from "class-validator";
import { Field, ObjectType, InputType } from "type-graphql";

@pre<User>('save', async function (){
    //Check that the password is being modified
    if (!this.isModified("password")) {
        return
    }
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hashSync(this.password, salt);
    this.password = hash;
})
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

    @Field(() => String, { defaultValue: 'user' })
    @prop({ default: 'user' })
    role: string;

    @Field(() => Number, { defaultValue: 0 })
    @prop({ default: 0 })
    reserved: number;

    @Field(() => Number, { defaultValue: 0 })
    @prop({ default: 0 })
    cancelled: number;
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

@InputType()
export class LoginInput {
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
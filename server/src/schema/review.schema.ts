import { getModelForClass, prop } from "@typegoose/typegoose";
import { IsNumber, IsString } from "class-validator";
import { Field, InputType, ObjectType } from "type-graphql";


@ObjectType()
export class Review {
    @Field(() => String)
    _id: string;

    @Field(() => String)
    @prop({required:true})
    reviewerID: string;

    @Field(() => String)
    @prop({required:true})
    reviewer: string;

    @Field(() => String)
    @prop({required:true})
    reviewDescription: string;

    @Field(() => Number)
    @prop({required:true})
    rating: number;

    @Field(() => Number)
    @prop({ required: true, default: () => Date.now() })
    createdAt: number;
}

export const ReviewModel = getModelForClass<typeof Review>(Review);

@InputType()
export class CreateReviewInput {
    @IsString()
    @Field(() => String)
    reviewDescription: string;

    @IsNumber()
    @Field(() => Number)
    rating: number;
}

@InputType()
export class GetMyReviewsInput {
    @IsString()
    @Field(() => String)
    userID: string;
}
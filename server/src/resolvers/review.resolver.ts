import { Arg, Authorized, Ctx, Mutation, Resolver } from "type-graphql";
import ReviewService from "../service/review.service";
import { CreateReviewInput, Review } from "../schema/review.schema";
import Context from "../types/context";


@Resolver()
export default class ReviewResolver {
    constructor(private reviewService: ReviewService) {
        this.reviewService = new ReviewService();
    }

    @Authorized()
    @Mutation(() => Review)
    createReview(
        @Arg("input") input: CreateReviewInput,
        @Ctx() context: Context
    ) {
        const user = context.user!;
        return this.reviewService.createReview({ ...input, user });
    }
}
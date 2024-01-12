import { Arg, Args, Authorized, Ctx, Int, Mutation, Query, Resolver } from "type-graphql";
import ReviewService from "../service/review.service";
import { CreateReviewInput, DeleteReviewInput, GetMyReviewsInput, PaginationInput, Review, UpdateReviewInput } from "../schema/review.schema";
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

    @Query(() => [Review])
    getLastReviews() {
        return this.reviewService.getLastReviews();
    }

    @Query(() => [Review])
    getMyReviews(@Arg("input") input: GetMyReviewsInput) {
        return this.reviewService.getMyReviews(input);
    }

    @Authorized()
    @Mutation(() => Review)
    updateMyReview(@Arg("input") input: UpdateReviewInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.reviewService.updateReview({...input, user});
    }

    @Authorized()
    @Mutation(() => String)
    deleteMyReview(@Arg("input") input: DeleteReviewInput, @Ctx() context: Context) {
        const user = context.user!;
        return this.reviewService.deleteReview({...input, user});
    }

    @Query(() => [Review])
    async getAllReviews(@Arg('input') input: PaginationInput) {
        return this.reviewService.getPaginatedReviews(input);
    }
    
}
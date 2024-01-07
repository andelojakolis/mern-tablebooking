import { CreateReviewInput, ReviewModel } from "../schema/review.schema";
import { User } from "../schema/user.schema";

class ReviewService {
    async createReview(input: CreateReviewInput & { user: User }) {
        const { reviewDescription, rating, user } = input;

        try {
            const newReview = await ReviewModel.create({
                reviewer: user.name,
                reviewDescription,
                rating,
            });
            return newReview;
        } catch (error) {
            console.error('Error creating review:', error);
        }
    }
}

export default ReviewService;
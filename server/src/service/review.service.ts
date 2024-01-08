import { CreateReviewInput, GetMyReviewsInput, ReviewModel } from "../schema/review.schema";
import { User } from "../schema/user.schema";

class ReviewService {
    async createReview(input: CreateReviewInput & { user: User }) {
        const { reviewDescription, rating, user } = input;

        try {
            const newReview = await ReviewModel.create({
                reviewerID: user._id,
                reviewer: user.name,
                reviewDescription,
                rating,
            });
            return newReview;
        } catch (error) {
            console.error('Error creating review:', error);
        }
    }

    async getLastReviews() {
        try {
            const lastReviews = await ReviewModel.find().sort({ createdAt: -1 }).limit(3);
            return lastReviews;
        } catch (error) {
        console.error('Error fetching last reviews:', error);
        }
    }

    async getMyReviews(input: GetMyReviewsInput) {
        try {
            const myReviews = await ReviewModel.find({reviewerID: input.userID});
            return myReviews;
        } catch (error) {
            console.error('Error fetching my reviews:', error);
        }
    }

    async updateMyReview(input: CreateReviewInput & { user: User }) {
        // add to input -> id off review, 
        // to be able to update by review id  
    }
}

export default ReviewService;
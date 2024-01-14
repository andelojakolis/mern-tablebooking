import { ApolloError } from "apollo-server";
import { CreateReviewInput, DeleteReviewInput, GetMyReviewsInput, PaginationInput, Review, ReviewModel, UpdateReviewInput } from "../schema/review.schema";
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

    async updateReview(input: UpdateReviewInput & { user: User }) {
        try {
            const { reviewID, reviewDescription, rating, user } = input;
            const review = await ReviewModel.findOne({ _id: reviewID, reviewerID: user._id });
            if (!review) {
                throw new ApolloError('This is not the review of the current user!');
            }

            const updateReview = await ReviewModel.findOneAndUpdate(
                { _id: reviewID },
                { reviewDescription, rating, isEdited: true },
                { new: true }
            );
            return updateReview;

        } catch (error) {
            console.error('Error updating my review: ', error);
        } 
    }

    async deleteReview(input: DeleteReviewInput & { user: User}) {
        try {
            const review = await ReviewModel.findOne({ _id: input.reviewId });

            if (!review) {
                throw new Error('Review not found');
            }

            if (review.reviewerID !== input.user._id) {
                throw new Error('You can only delete your reviews');
            }

            await ReviewModel.deleteOne({ _id: input.reviewId });
            return 'Successfully deleted review!';

        } catch (error) {
            console.error('Error deleting review: ', error);
        }
    }

    async getPaginatedReviews(input: PaginationInput) {
        try {
            const { page, pageSize } = input;
            const skip = (page - 1) * pageSize;
            const paginatedReviews = await ReviewModel.find().sort({ createdAt: -1 }).skip(skip).limit(pageSize);
            return paginatedReviews;
        } catch (error) {
            console.error('Error fetching paginated reviews: ', error);
        }
    }
}

export default ReviewService;
import { useState } from "react";
import ReviewCard, { ReviewCardProps } from "../components/ReviewCard"
import { useMutation, useQuery } from "@apollo/client";
import client from '../graphql/auth';
import { GET_PAGINATED_REVIEWS } from "../graphql/queries";
import { DELETE_REVIEW, EDIT_REVIEW } from "../graphql/mutations";
import { FaStar } from "react-icons/fa";

const Review = () => {
  const pageSize = 5;
  const [ page, setPage ] = useState(1);
  const [ noMoreData, setNoMoreData ] = useState(false);
  const [ isDeleteConfirmationOpen, setIsDeleteConfirmationOpen ] = useState(false);
  const [ reviewToDelete, setReviewToDelete ] = useState<string | null>(null);
  const [ isEditReviewOpen, setIsEditReviewOpen ] = useState(false);
  const [ reviewToEdit, setReviewToEdit ] = useState<string | null>(null);
  const [ currentValue, setCurrentValue ] = useState(0);
  const [ hoverValue, setHoverValue ] = useState(undefined);
  const [ reviewDescription, setReviewDescription ] = useState('');

  const { loading, error, data, refetch, fetchMore } = useQuery(GET_PAGINATED_REVIEWS, {
    variables: { input: { page, pageSize } },
  });
  const [deleteReview] = useMutation(DELETE_REVIEW, { client });
  const [editReview] = useMutation(EDIT_REVIEW, { client });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const loadMore = () => {
    fetchMore({
      variables: {
        input: {
          page: page + 1,
          pageSize,
        },
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult || fetchMoreResult.getAllReviews.length === 0) {
          setNoMoreData(true);
          return prev;
        }
  
        setNoMoreData(false);
        return {
          getAllReviews: [...prev.getAllReviews, ...fetchMoreResult.getAllReviews],
        };
      },
    });
  
    setPage(page + 1);
  };

  const openDeleteConfirmation = (reviewId: string) => {
    setReviewToDelete(reviewId);
    setIsDeleteConfirmationOpen(true);
  };

  const closeDeleteConfirmation = () => {
    setReviewToDelete(null);
    setIsDeleteConfirmationOpen(false);
  };

  const handleDeleteReview = (reviewId: string) => {
    openDeleteConfirmation(reviewId);
  };

  const confirmDeleteReview = async () => {
    if(reviewToDelete !== null){
      try {
        await deleteReview({
          variables: { input: { reviewId: reviewToDelete } },
        });
        setIsDeleteConfirmationOpen(false);
        refetch();
      } catch (error) {
        console.error("Error deleting review: ", error);
      }
    }
  };

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const openEditReview = (reviewId: string) => {
    setReviewToEdit(reviewId);
    setIsEditReviewOpen(true);
  };

  const closeEditReview = () => {
    setReviewToEdit(null);
    setIsEditReviewOpen(false);
  };

  const handleEditReview = (reviewId: string) => {
    openEditReview(reviewId);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(reviewToEdit !== null){
      try {
        await editReview({
          variables: { input: { reviewID: reviewToEdit, reviewDescription: reviewDescription,
            rating: currentValue, } },
        });
        setIsEditReviewOpen(false);
        refetch();
      } catch (error) {
        console.error("Error deleting review: ", error);
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col justify-center items-center font-epilogue mx-3 w-[80vw] h-auto">
      <div className="shadow-xl md:w-[60%] w-[100%] h-[100%] bg-[#fbe3e8] m-2 rounded-lg border border-solid border-[#5cbdb9] flex flex-col justify-center items-center font-epilogue">
        {data?.getAllReviews.map((review: ReviewCardProps, index: number) => (
          <ReviewCard 
            key={index}
            _id={review._id}
            reviewer={review.reviewer}
            rating={review.rating}
            reviewDescription={review.reviewDescription}
            createdAt={review.createdAt}
            isMyReview={true}
            onDeleteReview={handleDeleteReview}
            onEditReview={handleEditReview}
            isEdited={review.isEdited}
          />
        ))}

        <button onClick={loadMore} className="font-epilogue font-semibold text-[16px] leading-[26px] text-[#a9a9a9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8] w-auto" disabled={noMoreData}>
        {noMoreData ? 'No More Data' : 'Load More...'}
        </button>
      </div>
      {isDeleteConfirmationOpen && (
        <div className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded shadow-lg'>
            <div className='modal-content'>
              <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Delete review</h1><br /><br />
              <p>Are you sure you want to delete this review?</p>
              <div className="flex justify-between mt-4">
                <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8]' onClick={confirmDeleteReview}>Yes</button>
                <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[#5cbdb9] bg-[#fbe3e8] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#5cbdb9]' onClick={closeDeleteConfirmation}>No</button>
              </div>
            </div>
          </div>
        </div>
      )}
      {isEditReviewOpen && (
        <div className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded shadow-lg'>
            <div className='modal-content'>
              <form className="flex flex-col" onSubmit={handleSubmit}>
                <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Edit review</h1><br /><br />
                <div className="flex flex-row">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      size={18}
                      onClick={() => handleClick(index + 1)}
                      onMouseOver={() => handleMouseOver(index + 1)}
                      onMouseLeave={handleMouseLeave}
                      color={(hoverValue || currentValue) > index ? '#FFBA5A' : '#a9a9a9'}
                      className="mr-2 mt-3 cursor-pointer"
                    />
                  ))}
                </div>
                <textarea
                  className="border border-solid border-gray-300 rounded-lg p-4 my-5 min-h-100 w-300"
                  placeholder="How is your experience with us?"
                  name="review"
                  id="review"
                  value={reviewDescription}
                  onChange={(e) => setReviewDescription(e.target.value)}
                ></textarea>
                <div className="flex justify-between mt-4">
                  <button
                    className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8]'
                    type="submit"
                  >
                    Edit
                  </button>
                  <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[#5cbdb9] bg-[#fbe3e8] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#5cbdb9]' onClick={closeEditReview}>Cancel</button>
                </div>
            </form>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default Review
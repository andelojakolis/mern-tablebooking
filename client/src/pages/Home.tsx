import { useState } from "react";
import { FaStar } from "react-icons/fa";
import { GET_LAST_THREE, GET_USER_INFO } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW, DELETE_REVIEW, EDIT_REVIEW } from "../graphql/mutations";
import client from '../graphql/auth';
import { ReviewCard } from "../components";
import { ReviewCardProps } from "../components/ReviewCard";
import { useNavigate } from "react-router-dom";

const Home = () => {

  const token = localStorage.getItem("accessToken");
  const currentUserID = localStorage.getItem("userID");

  const navigate = useNavigate();
  const navigateToReviews = () => {
    navigate('/review');
  };

  const [ currentEditValue, setCurrentEditValue ] = useState(0);
  const [ hoverEditValue, setHoverEditValue ] = useState(undefined);
  const [ currentValue, setCurrentValue ] = useState(0);
  const [ hoverValue, setHoverValue ] = useState(undefined);
  const [ reviewDescription, setReviewDescription ] = useState('');
  const [ editReviewDescription, setEditReviewDescription ] = useState('');
  const [ isDeleteConfirmationOpen, setIsDeleteConfirmationOpen ] = useState(false);
  const [ reviewToDelete, setReviewToDelete ] = useState<string | null>(null);
  const [ isEditReviewOpen, setIsEditReviewOpen ] = useState(false);
  const [ reviewToEdit, setReviewToEdit ] = useState<string | null>(null);

  const { data: getMyInfo, refetch: refetchMyInfo } = useQuery(GET_USER_INFO, {
    variables: { input: { _id: currentUserID } },
  });
  const { data: getLastThree, refetch: refetchLastThree } = useQuery(GET_LAST_THREE);
  const [createReview] = useMutation(CREATE_REVIEW, { client });
  const [deleteReview] = useMutation(DELETE_REVIEW, { client });
  const [editReview] = useMutation(EDIT_REVIEW, { client });

  const handleClick = (value: number) => {
    setCurrentValue(value);
  };

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue);
  };

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  };

  const handleEditClick = (value: number) => {
    setCurrentEditValue(value);
  };

  const handleEditMouseOver = (newHoverValue: any) => {
    setHoverEditValue(newHoverValue);
  };

  const handleEditMouseLeave = () => {
    setHoverEditValue(undefined);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await createReview({
        variables: {
          input: {
            reviewDescription: reviewDescription,
            rating: currentValue,
          },
        },
      });
      refetchMyInfo();
      refetchLastThree();
      setCurrentValue(0);
      setHoverValue(undefined);
      setReviewDescription('');
    } catch (error) {
      console.error("Error creating review:", error);
    }
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

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(reviewToEdit !== null){
      try {
        await editReview({
          variables: { input: { reviewID: reviewToEdit, reviewDescription: editReviewDescription,
            rating: currentEditValue, } },
        });
        setIsEditReviewOpen(false);
        refetchLastThree();
        refetchMyInfo();
        setCurrentEditValue(0);
        setHoverEditValue(undefined);
        setEditReviewDescription('');
      } catch (error) {
        console.error("Error deleting review: ", error);
      }
    }
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
        refetchLastThree();
      } catch (error) {
        console.error("Error deleting review: ", error);
      }
    }
  };

  return (
    <div className="flex md:flex-row flex-col font-epilogue mx-3 w-[80vw] md:h-[80vh] h-auto">
      <div className="shadow-xl md:w-[40%] w-[100%] h-[100%] bg-[white] m-2 rounded-lg border border-solid border-[#5cbdb9]">
        <h1 className="font-epilogue font-bold text-[#5cbdb9] md:text-[40px] text-[20px] text-center m-2 mt-8">Welcome,</h1>
        <p className="font-epilogue md:text-[20px] text-[14px] text-center m-2">{token ? `to our restaurant dear ${getMyInfo?.getUserInfo.name.split(' ')[0]}, you can book your table or leave a review.` : "dear guest, please login or register if you don't have an account."}</p>

        {token && (
          <form className="flex flex-col m-5 md:mt-30 mt-20" onSubmit={handleSubmit}>
            <h3>Leave a review...</h3>
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
            <button
              className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8] w-[40%]'
              type="submit"
            >
              Submit
            </button>
          </form>
        )}
      </div>

      <div className="shadow-xl md:w-[60%] w-[100%] h-[100%] bg-[#fbe3e8] m-2 rounded-lg border border-solid border-[#5cbdb9] flex flex-col justify-center items-center font-epilogue">
        {getLastThree?.getLastReviews.map((review: ReviewCardProps, index: number) => (
          <ReviewCard 
            key={index}
            _id={review._id}
            reviewer={review.reviewer}
            rating={review.rating}
            reviewDescription={review.reviewDescription}
            createdAt={review.createdAt}
            reviewerID={review.reviewerID}
            isMyReview={review.reviewerID == currentUserID ? true : false}
            onDeleteReview={handleDeleteReview}
            onEditReview={handleEditReview}
            isEdited={review.isEdited}
          />
        ))}

        <a href="" onClick={navigateToReviews} className="text-[16px] text-[#a9a9a9]">See all reviews...</a>
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
              <form className="flex flex-col" onSubmit={handleEditSubmit}>
                <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Edit review</h1><br /><br />
                <div className="flex flex-row">
                  {[...Array(5)].map((_, index) => (
                    <FaStar 
                      key={index}
                      size={18}
                      onClick={() => handleEditClick(index + 1)}
                      onMouseOver={() => handleEditMouseOver(index + 1)}
                      onMouseLeave={handleEditMouseLeave}
                      color={(hoverEditValue || currentEditValue) > index ? '#FFBA5A' : '#a9a9a9'}
                      className="mr-2 mt-3 cursor-pointer"
                    />
                  ))}
                </div>
                <textarea
                  className="border border-solid border-gray-300 rounded-lg p-4 my-5 min-h-100 w-300"
                  placeholder="How is your experience with us?"
                  name="review"
                  id="review"
                  value={editReviewDescription}
                  onChange={(e) => setEditReviewDescription(e.target.value)}
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

export default Home
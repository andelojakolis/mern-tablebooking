import { useState } from "react";
import { FaStar } from "react-icons/fa"
import { GET_USER_INFO } from "../graphql/queries";
import { useMutation, useQuery } from "@apollo/client";
import { CREATE_REVIEW } from "../graphql/mutations";
import client from '../graphql/auth';

const Home = () => {

  const token = localStorage.getItem("accessToken");
  const currentUserID = localStorage.getItem("userID");

  const [ currentValue, setCurrentValue ] = useState(0);
  const [ hoverValue, setHoverValue ] = useState(undefined);
  const [ reviewDescription, setReviewDescription ] = useState('');

  const { data: getMyInfo, refetch: refetchMyInfo } = useQuery(GET_USER_INFO, {
    variables: { input: { _id: currentUserID } },
  });
  const [createReview] = useMutation(CREATE_REVIEW, { client })

  const handleClick = (value: number) => {
    setCurrentValue(value);
  }

  const handleMouseOver = (newHoverValue: any) => {
    setHoverValue(newHoverValue);
  }

  const handleMouseLeave = () => {
    setHoverValue(undefined);
  }

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
      // refetch last reviews
      setCurrentValue(0);
      setHoverValue(undefined);
      setReviewDescription('');
    } catch (error) {
      console.error("Error creating review:", error);
    }
  };

  return (
    <div className="flex md:flex-row flex-col font-epilogue mx-3 w-[80vw] h-[80vh]">
      <div className="md:w-[40%] w-[100%] h-[100%] bg-[white] m-2 rounded-lg border border-solid border-[#5cbdb9]">
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

      <div className="md:w-[60%] w-[100%] h-[100%] bg-[white] m-2 rounded-lg border border-solid border-[#5cbdb9]">

      </div>
    </div>
  )
}

export default Home
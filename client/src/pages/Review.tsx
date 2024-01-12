import { useState } from "react";
import ReviewCard, { ReviewCardProps } from "../components/ReviewCard"
import { useQuery } from "@apollo/client";
import { GET_PAGINATED_REVIEWS } from "../graphql/queries";

const Review = () => {
  const pageSize = 5;
  const [page, setPage] = useState(1);
  const [noMoreData, setNoMoreData] = useState(false);

  const { loading, error, data, fetchMore } = useQuery(GET_PAGINATED_REVIEWS, {
    variables: { input: { page, pageSize } },
  });

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

  return (
    <div className="flex md:flex-row flex-col justify-center items-center font-epilogue mx-3 w-[80vw] h-auto">
      <div className="shadow-xl md:w-[60%] w-[100%] h-[100%] bg-[#fbe3e8] m-2 rounded-lg border border-solid border-[#5cbdb9] flex flex-col justify-center items-center font-epilogue">
        {data?.getAllReviews.map((review: ReviewCardProps, index: number) => (
          <ReviewCard 
            key={index}
            reviewer={review.reviewer}
            rating={review.rating}
            reviewDescription={review.reviewDescription}
            createdAt={review.createdAt}
          />
        ))}

        <button onClick={loadMore} className="font-epilogue font-semibold text-[16px] leading-[26px] text-[#a9a9a9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8] w-auto" disabled={noMoreData}>
        {noMoreData ? 'No More Data' : 'Load More...'}
        </button>
      </div>
    </div>
  )
}

export default Review
import { FaStar } from "react-icons/fa"

interface ReviewCardProps {
    reviewer: string;
    rating: number;
    reviewDescription: string;
    createdAt: number;
}

const ReviewCard: React.FC<ReviewCardProps> = ({ reviewer, rating, reviewDescription, createdAt }) => {

  const initials = reviewer.split(' ').map((n) => n[0]).join('').toUpperCase();

  const dateObject = new Date(createdAt);
  const formattedDate = dateObject.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });

  return (
    <div className="bg-[#ebf6f5] w-[90%] h-[160px] m-4 rounded-lg flex flex-col border border-solid border-[#5cbdb9] relative">
          <div className="flex flex-row">
            <div className="w-[40px] h-[40px] border border-solid border-[#5cbdb9] rounded-full bg-[#fbe3e8] m-2 flex justify-center items-center sm:text-[25px] text-[16px] text-[#5cbdb9] font-bold">{initials}</div>
            <div className="w-auto h-[40px] flex justify-center items-center m-2 sm:text-[20px] text-[14px] text-[#5cbdb9] font-semibold">{reviewer}</div>
            <div className="w-auto h-[40px] flex justify-center items-center m-2">
            {[...Array(rating)].map((_, index) => (
                <FaStar 
                  key={index}
                  size={12}
                  color={'#FFBA5A'}
                  className="mr-2"
                />
              ))}
            </div>
          </div>
          <div className="text-[14px] mx-3 my-2 sm:line-clamp-3 line-clamp-2 h-[60px]">{reviewDescription}</div>
          <div className="text-[16px] text-[#a9a9a9] absolute bottom-[2px] right-[10px]">{formattedDate}</div>
        </div>
  )
}

export default ReviewCard;
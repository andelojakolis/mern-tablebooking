import React from 'react'
import { table } from '../assets';
import { tableStyles } from '../constants';

// interface TableProps {
//     imageNumber: number;
//     handleImageClick: (imageNumber: number) => void;
//     opacity: boolean;
// }

// const Table: React.FC<TableProps> = ({imageNumber, handleImageClick, opacity}) => {
//   return (
//     <div className={`sm:ml-8 ml-2 basis-1/3 z-10`}>
//         <img
//             onClick={() => handleImageClick(imageNumber)}
//             className={`${opacity ? 'opacity-75 cursor-pointer' : 'opacity-25'}`}
//             src={table}
//             alt={`Table image ${imageNumber}`}
//             width={200}
//             height={100}
//         />
//     </div>
//   )
// }

interface TableProps {
  index: number;
  handleImageClick: (index: number) => void;
  isReserved: boolean;
}

const Table: React.FC<TableProps> = ({ index, handleImageClick, isReserved }) => {
  
  const handleClick = () => {
    if (!isReserved) {
      handleImageClick(index + 1);
    }
  };

  return (
    <div className={tableStyles[index]} onClick={handleClick}>
      <img
        className={`${isReserved ? 'opacity-25' : 'opacity-75 cursor-pointer'} sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]`}
        src={table}
        alt="Table image"
      />
    </div>
  );
};

export default Table
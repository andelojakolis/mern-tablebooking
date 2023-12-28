import React from 'react'
import { table, cancel } from '../assets';
import { tableStyles } from '../constants';
interface TableProps {
  index: number;
  handleImageClick: (index: number) => void;
  isReserved: boolean;
  isMyTable: boolean;
}

const Table: React.FC<TableProps> = ({ index, handleImageClick, isReserved, isMyTable }) => {
  
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
      {isMyTable && (
        <button className="absolute top-0 right-0 w-[25px] h-[25px]">
          <img src={cancel} alt="Cancel icon" />
        </button>
      )}
    </div>
  );
};

export default Table
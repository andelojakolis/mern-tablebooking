import React from 'react'
import { table, cancel } from '../assets';
import { tableStyles } from '../constants';
interface TableProps {
  index: number;
  handleImageClick?: (index: number) => void;
  handleImageOnMouseEnter?: (index: number) => void;
  handleImageOnMouseLeave?: (index: number) => void;
  isReserved: boolean;
  isMyTable?: boolean;
  onCancelReservation: (index: number) => void;
}

const Table: React.FC<TableProps> = ({ index, handleImageClick, isReserved, isMyTable, onCancelReservation, handleImageOnMouseEnter, handleImageOnMouseLeave }) => {
  
  const handleClick = () => {
    if (!isReserved && handleImageClick) {
      handleImageClick(index + 1);
    }
  };

  const handleCancelButtonClick = () => {
    if (isMyTable) {
      onCancelReservation(index + 1)
    }
  }

  const handleOnMouseEnter: React.MouseEventHandler<HTMLImageElement> = () => {
    if (handleImageOnMouseEnter) {
      handleImageOnMouseEnter(index + 1);
    }
  }

  const handleOnMouseLeave: React.MouseEventHandler<HTMLImageElement> = () => {
    if (handleImageOnMouseLeave) {
      handleImageOnMouseLeave(index + 1);
    }
  }

  return (
    <div className={tableStyles[index]} onClick={handleClick}>
      <img
        className={`${isReserved ? 'opacity-25' : 'opacity-75 cursor-pointer'} sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]`}
        src={table}
        alt="Table image"
        onMouseEnter={handleOnMouseEnter}
        onMouseLeave={handleOnMouseLeave}
      />
      {isMyTable && (
        <button className="absolute top-0 right-0 w-[25px] h-[25px]" onClick={handleCancelButtonClick}>
          <img src={cancel} alt="Cancel icon" />
        </button>
      )}
    </div>
  );
};

export default Table
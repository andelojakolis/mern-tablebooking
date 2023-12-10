import React from 'react'
import { table } from '../assets';

interface TableProps {
    imageNumber: number;
    handleImageClick: (imageNumber: number) => void;
    opacity: boolean;
}

const Table: React.FC<TableProps> = ({imageNumber, handleImageClick, opacity}) => {
  return (
    <div className={`sm:ml-8 ml-2 basis-1/3 z-10`}>
        <img
            onClick={() => handleImageClick(imageNumber)}
            className={`${opacity ? 'opacity-75 cursor-pointer' : 'opacity-25'}`}
            src={table}
            alt={`Table image ${imageNumber}`}
            width={200}
            height={100}
        />
    </div>
  )
}

export default Table
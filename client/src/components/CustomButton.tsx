import React from 'react'

export interface CustomButtonProps {
    btnType?: 'button' | 'submit' | 'reset';
    title: string;
    handleClick: () => void;
    styles: string;
}

const CustomButton: React.FC<CustomButtonProps> = ({ btnType, title, handleClick, styles}) => {
  return (
    <button
        type={btnType}
        className={`font-epilogue font-semibold text-[16px] leading-[26px] text-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#5cbdb9] ${styles}`}
        onClick={handleClick}
    >
        {title}
    </button>
  )
}

export default CustomButton
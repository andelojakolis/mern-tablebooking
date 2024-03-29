import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { forkknife, admin } from '../assets';
import { navlinks } from '../constants';
import { useQuery } from '@apollo/client';
import { GET_USER_INFO } from '../graphql/queries';

interface IconProps {
  styles?: string;
  name?: string;
  imgUrl?: string;
  isActive?: string;
  disabled?: boolean;
  handleClick?: () => void;
}

const Icon: React.FC<IconProps> = ({ styles, name, imgUrl, isActive, disabled, handleClick }) => (
  <div className={`w-[48px] h-[48px] rounded-[10px] ${isActive && isActive === name && 'bg-[black] opacity-25'} flex justify-center items-center ${!disabled && 'cursor-pointer'} ${styles}`} onClick={handleClick}>
    {!isActive ? (
      <img src={imgUrl} alt="restaurant_logo" className='w-1/2 h-1/2'/>
    ) : (
      <img src={imgUrl} alt="restaurant_logo" className={`w-1/2 h-1/2 ${isActive !== name && 'grayscale'}`}/>
    )}
  </div>
) 

const Sidebar: React.FC = () => {
  
  const currentUserID = localStorage.getItem('userID');

  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>('dashboard');

  const { data } = useQuery(GET_USER_INFO, {
    variables: { input: { _id: currentUserID } },
  });

  return (
    <div className="flex justify-between items-center flex-col sticky top-5 h-[93vh]">
      <Link to="/">
        <Icon styles="w-[52px] h-[52px] bg-[#5cbdb9]" imgUrl={ forkknife }/>
      </Link>

      <div className='flex-1 flex flex-col justify-between items-center bg-[#5cbdb9] rounded-[20px] w-[76px] py-4 mt-12'>
        <div className='flex flex-col justify-center items-center gap-3'>
          {navlinks.map((link) => (
            <Icon 
              key={link.name}
              {...link}
              isActive={isActive}
              handleClick={() => {
                if(!link.disabled){
                  setIsActive(link.name);
                  navigate(link.link);
                }
              }}
            />  
          ))}
        </div>
        {data?.getUserInfo.role == 'admin' && (
          <Icon styles="bg-[#fbe3e8] cursor-pointer text-[#5cbdb9] hover:scale-105" imgUrl={admin} handleClick={() => navigate('/admin')} />
        )}
      </div>
    </div>
  )
}

export default Sidebar
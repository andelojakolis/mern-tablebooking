import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { navlinks } from '../constants';
import { forkknife, hamburgerMenu } from '../assets';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  const token = localStorage.getItem('accessToken');

  return (
    <div className="flex md:flex-row flex-col-reverse justify-end mb-[35px] gap-6">
      
      <div className='sm:flex hidden flex-row justify-end gap-4'>
          <CustomButton 
            btnType="button"
            title={token ? 'Logout' : 'Login'}
            styles={token ? 'bg-[#fbe3e8]' : 'bg-[#5cbdb9] text-white'}
            handleClick={() => {
              if(token) {
                localStorage.removeItem('accessToken')
                navigate('/')
              } else {
                navigate('/login')
              }
            }}
          />

          {token ? (
            <div className='flex justify-center items-center'>
              <div className='w-[20px] h-[20px] rounded-full bg-[#2c2f32] ring ring-green-300 ring-offset-4 bg-green-500'></div>
            </div>
            ) : (
            <div className='flex justify-center items-center'>
              <div className='w-[20px] h-[20px] rounded-full bg-[#2c2f32] ring ring-red-300 ring-offset-4 bg-red-500'></div>
            </div>)}
      </div>

      <div className='z-30 sm:hidden flex justify-between items-center relative'>
        <div className='w-[40px] h-[40px] rounded-[10px] bg-[#5cbdb9] flex justify-center items-center cursor-pointer'>
          <img src={forkknife} alt="user" className='w-[60%] h-[60%] object-contain' onClick={() => {navigate('/')}}/>
        </div>

        <img
          src={hamburgerMenu}
          alt="menu"
          className='w-[34px] h-[34px] object-contain cursor-pointer'
          onClick={() => setToggleDrawer((prev) => !prev)}
        />

        <div className={`absolute top-[60px] right-0 left-0 bg-[#ebf6f5] z-10 shadow-secondary py-4 ${!toggleDrawer ? '-translate-y-[100vh]' : 'translate-y-0'} transition-all duration-700`}>
          <ul className='mb-4'>
            {navlinks.map((link) => (
              <li
                key={link.name}
                className={`flex p-4 ${isActive === link.name && 'bg-[#5cbdb9]'}`}
                onClick={() => {
                  setIsActive(link.name);
                  setToggleDrawer(false);
                  navigate(link.link);
                }}
              >
                <img
                  src={link.imgUrl}
                  alt={link.name}
                  className={`w-[24px] h-[24px] object-contain ${isActive === link.name ? 'grayscale-0' : "grayscale"}`}
                />
                <p className={`ml-[20px] font-epilogue font-semibold text-[14px] ${isActive === link.name ? 'text-[white]' : 'text-[#5cbdb9]'}`}>
                  {link.name}
                </p>
              </li>
            ))}
          </ul>

          <div className='flex mx-4'>
            <CustomButton 
              btnType="button"
              title={token ? 'Logout' : 'Login'}
              styles={token ? 'bg-[#fbe3e8]' : 'bg-[#5cbdb9] text-white'}
              handleClick={() => {
                if(token) {
                  setToggleDrawer(false);
                  localStorage.removeItem('accessToken')
                  navigate('/');
                } else {
                  setToggleDrawer(false);
                  navigate('/login');
                }
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

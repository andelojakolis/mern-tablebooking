import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { CustomButton } from './';
import { navlinks } from '../constants';
import { forkknife, hamburgerMenu } from '../assets';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState<string>('dashboard');
  const [toggleDrawer, setToggleDrawer] = useState<boolean>(false);

  return (
    <div className="flex md:flex-row flex-col-reverse justify-end mb-[35px] gap-6">
      
      <div className='sm:flex hidden flex-row justify-end gap-4'>
          <CustomButton 
            btnType="button"
            title={'loggedin' ? 'Book a table' : 'Login'}
            styles={'loggedin' ? 'bg-[#fbe3e8]' : 'bg-[#ebf6f5]'}
            handleClick={() => {
              if('loggedin') navigate('table-booking')
              else 'Login'
            }}
          />

          <Link to="/profile">
            <div className='w-[52px] h-[52px] rounded-full bg-[#2c2f32] flex justify-center items-center cursor-pointer'>
              <img src={'userImg'} alt="user" className='w-[60%] h-[60%] object-contain'/>
            </div>
          </Link>
      </div>

      <div className='sm:hidden flex justify-between items-center relative'>
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
              title={'loggedin' ? 'Logout' : 'Login'}
              styles={'loggedin' ? 'bg-[#1dc071]' : 'bg-[#8c6dfd]'}
              handleClick={() => {
                if('loggedin') navigate('table-booking')
                else 'Login'
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;

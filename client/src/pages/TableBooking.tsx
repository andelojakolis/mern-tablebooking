import React, { useState } from 'react'

import Table from '../components/Table';
import { restaurant, table } from '../assets';

const TableBooking: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('');
  const [persons, setPersons] = useState<number>(1);
  const [mealType, setMealType] = useState<string>('lunch');

  const openModal = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index: number) => {
    openModal(index);
  };

  const handleModalClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      tableNumber: selectedImageIndex,
      date,
      time,
      persons,
      mealType,
    };
    console.log(formData);
    // send to backend
    closeModal();
  };

  const fetchedArray = [1,6,8]

  return (
    <div className='flex sm:flex-row flex-col relative'>
      <div className='relative w-[90vw]'>
        <img className='sm:h-[80vh] h-[50vh] m-auto sm:w-[60%]  z-0 rounded-lg' src={restaurant} alt="Restaurant Floor Plan" />
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] left-[45%]'><img onClick={() => handleImageClick(1)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] sm:left-[55%] left-[60%]'><img onClick={() => handleImageClick(2)} className='opacity-25 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] sm:left-[65%] left-[75%]'><img onClick={() => handleImageClick(3)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[45%] sm:left-[50%] left-[55%]'><img onClick={() => handleImageClick(4)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[45%] sm:left-[60%] left-[70%]'><img onClick={() => handleImageClick(5)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[20%] sm:left-[50%] left-[55%]'><img onClick={() => handleImageClick(6)} className='opacity-25 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[20%] sm:left-[60%] left-[70%]'><img onClick={() => handleImageClick(7)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] left-[45%]'><img onClick={() => handleImageClick(8)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] sm:left-[54%] left-[59%]'><img onClick={() => handleImageClick(9)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
        <div className='sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] sm:left-[63%] left-[72%]'><img onClick={() => handleImageClick(10)} className='cursor-pointer opacity-75 sm:w-[65px] sm:h-[65px] w-[30px] h-[30px]' src={table} alt="Table image"/></div>
      </div>
      <div className='font-epilogue sm:w-[19vw] w-[90vw] h-[22vh] absolute sm:left-[20%] left-[-4px] sm:bottom-[1px] bottom-[-50%] rounded-lg text-left p-4'>
        <label htmlFor="">Date: </label>
        <input type="date" name="" id="" /><br />
        <label htmlFor="lunch">Lunch </label> <input type="radio" name="mealType" id="lunch" /><br />
        <label htmlFor="dinner">Dinner </label> <input type="radio" name="mealType" id="dinner" /><br />
        <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] min-h-[52px] px-4 rounded-[10px] border border-solid border-[white] sm:ml-11 ml-7 mt-2 bg-[#5cbdb9]' type="submit">Check availability</button>
      </div> 
    {/*<div className='flex flex-col'>
      {[1, 2, 3].map((row) => (
        <div key={row} className='flex flex-row justify-normal gap-2'>
          {[1, 2, 3].map((col) => {
            const imageNumber = row * 3 + col - 3;
            const opacity = !fetchedArray.includes(imageNumber);
            const handleClick = opacity ? () => handleImageClick(imageNumber) : () => {};

            return (
              <Table 
                key={col}
                imageNumber={imageNumber}
                handleImageClick={handleClick}
                opacity={opacity}
              />
            )
          })}
        </div>
      ))}
       <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(1)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(2)} className='opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(3)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(4)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(5)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(6)} className='opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(7)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(8)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick(9)} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div> 
</div>*/}
<div>{/** kalendar i rucak/vecera */}</div>
      {isModalOpen && (
        <div onClick={handleModalClick} className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
          <div className='bg-white p-8 rounded shadow-lg'>
            <div className='modal-content'>
            <form onSubmit={handleSubmit}>
                <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Reservation Details</h1><br /><br />
                <label className='font-epilogue font-semibold'>
                  Table Number:
                  <input type="text" value={` ${selectedImageIndex}`} readOnly />
                </label><br /><br />
                <label className='font-epilogue font-semibold'>
                  Date: 
                  <input className='px-2' type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </label><br /><br />
                <label className='font-epilogue font-semibold'>
                  Time:
                  <input className='px-2' type="time" value={time} onChange={(e) => setTime(e.target.value)} />
                </label><br /><br />
                <label className='font-epilogue font-semibold'>
                  Number of Persons:
                  <input className='px-2' type="number" min="1" max="4" value={persons} onChange={(e) => setPersons(Number(e.target.value))} />
                </label><br /><br />
                <div>
                  <label className='font-epilogue font-semibold'>
                    <input type="radio" name="mealType" value="lunch" checked={mealType === 'lunch'} onChange={() => setMealType('lunch')} />
                    Lunch
                  </label><br />
                  <label className='font-epilogue font-semibold'>
                    <input type="radio" name="mealType" value="dinner" checked={mealType === 'dinner'} onChange={() => setMealType('dinner')} />
                    Dinner
                  </label><br /><br />
                </div>
                <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8]' type="submit">Book table</button>
              </form>
              <button onClick={closeModal}>Close</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default TableBooking
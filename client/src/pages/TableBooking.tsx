import React, { useState } from 'react'

import { table } from '../assets'

const TableBooking: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<string | null>(null);
  const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('');
  const [persons, setPersons] = useState<number>(1);
  const [mealType, setMealType] = useState<string>('lunch');

  const openModal = (index: string) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImageIndex(null);
  };

  const handleImageClick = (index: string) => {
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

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('1')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('2')} className='cursor-pointer opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('3')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('4')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('5')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('6')} className='cursor-pointer opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('7')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('8')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img onClick={() => handleImageClick('9')} className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      {isModalOpen && (
        <div onClick={handleModalClick} className='fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
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
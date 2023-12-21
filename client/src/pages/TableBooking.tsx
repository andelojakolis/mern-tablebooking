import React, { useState, useEffect } from 'react'

import Table from '../components/Table';
import { restaurant } from '../assets';
import client from '../graphql/auth';
import { CREATE_RESERVATION } from '../graphql/mutations';
import { CHECK_AVAILABILITY } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
//import { useNavigate } from 'react-router-dom';

const TableBooking: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  //const [date, setDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [time, setTime] = useState<string>('');
  const [persons, setPersons] = useState<number>(1);
  //const [mealType, setMealType] = useState<string>('lunch');
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterMealType, setFilterMealType] = useState<string>('lunch');
  const [isReserved, setIsReserved] = useState<number[]>([]);
  //const navigate = useNavigate();

  const [createReservation] = useMutation(CREATE_RESERVATION, { client });
  const  getReservationsArray = useQuery(CHECK_AVAILABILITY, {variables: {input: {date: filterDate, mealType: filterMealType}}});
  
  //console.log(getReservationsArray.data?.getReservations);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      tableNumber: selectedImageIndex,
      date: filterDate,
      time,
      persons,
      mealType: filterMealType,
    };
    // send to backend
    try {
      await createReservation({
        variables: { input: formData },
      });

      closeModal();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
    closeModal();
  };

  useEffect(() => {
    const now = new Date();
    const hours = now.getHours();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    const defaultDate = `${year}-${month}-${day}`;
    setFilterDate(defaultDate);

    if (hours >= 15 && hours < 24) {
      setFilterMealType('dinner');
    } else {
      setFilterMealType('lunch');
    }
  }, []);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterDate(event.target.value);
  };

  const handleMealTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setFilterMealType(event.target.value);
  };

  useEffect(() => {
    if (getReservationsArray.data?.getReservations) {
      const reservedTableNumbers = getReservationsArray.data.getReservations.map(
        (reservation: number) => reservation
      );

      setIsReserved(reservedTableNumbers);
    }
  }, [getReservationsArray.data]);

  // const handleFilterSubmit = async () => {
    
  // };
  

  return (
    <div className='flex sm:flex-row flex-col relative'>
      <div className='relative w-[90vw]'>
      <img className='sm:h-[80vh] h-[50vh] m-auto sm:w-[60%]  z-0 rounded-lg' src={restaurant} alt="Restaurant Floor Plan" />
      {[...Array(10).keys()].map((index) => (
        <Table
          key={index}
          index={index}
          handleImageClick={handleImageClick}
          isReserved={isReserved.includes(index + 1)}
        />
      ))}
    </div>
      <div className='font-epilogue sm:w-[19vw] w-[90vw] h-[22vh] absolute sm:left-[20%] left-[-4px] sm:bottom-[1px] bottom-[-50%] rounded-lg text-left p-4'>
      <label htmlFor="">Date: </label>
      <input type="date" name="" id="" value={filterDate} onChange={handleDateChange} /><br />
      <label htmlFor="lunch">Lunch </label>
      <input type="radio" name="mealType" id="lunch" value="lunch" checked={filterMealType === 'lunch'} onChange={handleMealTypeChange} /><br />
      <label htmlFor="dinner">Dinner </label>
      <input type="radio" name="mealType" id="dinner" value="dinner" checked={filterMealType === 'dinner'} onChange={handleMealTypeChange} /><br />
      {/* <button
        className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] min-h-[52px] px-4 rounded-[10px] border border-solid border-[white] sm:ml-11 ml-7 mt-2 bg-[#5cbdb9]'
        type="submit"
        onClick={handleFilterSubmit}
      >
        Check availability
      </button> */}
    </div>
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
                  <input className='px-2' type="date" value={filterDate} onChange={(e) => setFilterDate(e.target.value)} />
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
                    <input type="radio" name="mealType" value="lunch" checked={filterMealType === 'lunch'} onChange={() => setFilterMealType('lunch')} />
                    Lunch
                  </label><br />
                  <label className='font-epilogue font-semibold'>
                    <input type="radio" name="mealType" value="dinner" checked={filterMealType === 'dinner'} onChange={() => setFilterMealType('dinner')} />
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
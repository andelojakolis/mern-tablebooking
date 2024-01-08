import React, { useState, useEffect } from 'react'

import Table from '../components/Table';
import { restaurant } from '../assets';
import client from '../graphql/auth';
import { CANCEL_RESERVATION, CREATE_RESERVATION } from '../graphql/mutations';
import { CHECK_AVAILABILITY, IS_MY_TABLE } from '../graphql/queries';
import { useMutation, useQuery } from '@apollo/client';

const TableBooking: React.FC = () => {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [time, setTime] = useState<string>('');
  const [persons, setPersons] = useState<number>(1);
  const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
  const [filterMealType, setFilterMealType] = useState<string>('lunch');
  const [isReserved, setIsReserved] = useState<number[]>([]);
  const [isMyTable, setIsMyTable] = useState<number[]>([]);
  const [shouldExecuteDependentQuery, setShouldExecuteDependentQuery] = useState(false);
  const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);
  const [tableNumberToCancel, setTableNumberToCancel] = useState<number | null>(null);

  const [createReservation] = useMutation(CREATE_RESERVATION, { client });
  const [cancelReservation] = useMutation(CANCEL_RESERVATION, { client });
  const { data: checkAvailability, refetch: refetchAvailability } = useQuery(CHECK_AVAILABILITY, {
    variables: { input: { date: filterDate, mealType: filterMealType } },
    onCompleted: () => setShouldExecuteDependentQuery(true),
  });
  
  const userId = localStorage.getItem('userID');

  const { data: checkIsMyTable, refetch: refetchMyTable } = useQuery(IS_MY_TABLE, {
    variables: { input: { date: filterDate, mealType: filterMealType, myId: userId } },
    skip: !shouldExecuteDependentQuery,
    onError: (error) => console.error('Error in checkIsMyTable query:', error),
  });

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
    try {
      await createReservation({
        variables: { input: formData },
      });
      refetchAvailability();
      refetchMyTable();
      closeModal();
    } catch (error) {
      console.error('Error creating reservation:', error);
    }
    closeModal();
  };

  const openCancelConfirmation = (tableNumber: number) => {
    setTableNumberToCancel(tableNumber);
    setIsCancelConfirmationOpen(true);
  };

  const closeCancelConfirmation = () => {
    setTableNumberToCancel(null);
    setIsCancelConfirmationOpen(false);
  };

  const handleCancelReservation = (tableNumber: number) => {
    openCancelConfirmation(tableNumber);
  };

  const confirmCancelReservation = async () => {
    if (tableNumberToCancel !== null) {
      try {
        await cancelReservation({
          variables: { input: { date: filterDate, mealType: filterMealType, tableNumber: tableNumberToCancel } },
        });
        refetchAvailability();
        refetchMyTable();
        closeCancelConfirmation();
      } catch (error) {
        console.error('Error canceling reservation:', error);
      }
    }
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
    if (shouldExecuteDependentQuery) {
      refetchMyTable();
    }
  }, [shouldExecuteDependentQuery]);

  useEffect(() => {
    if (checkAvailability?.getReservations) {
      const reservedTableNumbers = checkAvailability.getReservations.map(
        (reservation: number) => reservation
      );

      setIsReserved(reservedTableNumbers);
    }
  }, [checkAvailability]);

  useEffect(() => {
    if (checkIsMyTable?.findMyReservations) {
      const myTableNumbers = checkIsMyTable.findMyReservations.map(
        (reservation: number) => reservation
      );

      setIsMyTable(myTableNumbers);
    }
  }, [checkIsMyTable]);

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
          isMyTable={isMyTable.includes(index + 1)}
          onCancelReservation={handleCancelReservation}
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

      {isCancelConfirmationOpen && (
              <div className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                <div className='bg-white p-8 rounded shadow-lg'>
                  <div className='modal-content'>
                    <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Cancel Reservation</h1><br /><br />
                    <p>Are you sure you want to cancel this reservation?</p>
                    <div className="flex justify-between mt-4">
                      <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8]' onClick={confirmCancelReservation}>Yes</button>
                      <button className='font-epilogue font-semibold text-[16px] leading-[26px] text-[#5cbdb9] bg-[#fbe3e8] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#5cbdb9]' onClick={closeCancelConfirmation}>No</button>
                    </div>
                  </div>
                </div>
              </div>
            )}
    </div>
  )
}

export default TableBooking
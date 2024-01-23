import { useEffect, useState } from "react";
import { restaurant } from "../assets"
import Table from "../components/Table"
import { useMutation, useQuery } from "@apollo/client";
import { CANCEL_RESERVATION_ADMIN } from "../graphql/mutations";
import client from '../graphql/auth';
import { CHECK_AVAILABILITY, GET_RESERVATION_INFO_ADMIN, GET_USER_INFO } from "../graphql/queries";


const Admin = () => {

    const [filterDate, setFilterDate] = useState<string>(new Date().toISOString().split('T')[0]);
    const [filterMealType, setFilterMealType] = useState<string>('lunch');
    const [isReserved, setIsReserved] = useState<number[]>([]);
    const [isCancelConfirmationOpen, setIsCancelConfirmationOpen] = useState(false);
    const [tableNumberToCancel, setTableNumberToCancel] = useState<number | null>(null);
    const [isInfoOpen, setIsInfoOpen] = useState(false);
    const [hoveredTableInfo, setHoveredTableInfo] = useState<any | null>(null);

    const [cancelReservation] = useMutation(CANCEL_RESERVATION_ADMIN, { client });
    const { data: checkAvailability, refetch: refetchAvailability } = useQuery(CHECK_AVAILABILITY, {
        variables: { input: { date: filterDate, mealType: filterMealType } },
    });
    
    const token = localStorage.getItem('accessToken');
    const userId = localStorage.getItem('userID');

    const { data: getMyInfo, refetch: refetchMyInfo } = useQuery(GET_USER_INFO, {
        variables: { input: { _id: userId } },
    });
    const { data: getReservationInfo, refetch: refetchReservationInfo } = useQuery(GET_RESERVATION_INFO_ADMIN, {
      variables: {
        input: {
          date: filterDate,
          mealType: filterMealType,
          myId: userId
        }
      }
    });

    const isAdmin = getMyInfo?.getUserInfo.role === 'admin';

    const openReservationInfo = () => {
      setIsInfoOpen(true);
    };
  
    const closeReservationInfo = () => {
      setIsInfoOpen(false);
    };

    const handleImageOnMouse = (index: number) => {
        openReservationInfo();
        const hoveredTableNumber = index;
        const hoveredTable = getReservationInfo?.getReservationsAdmin?.tableInfo.find((info: any) => info.tableNumber === hoveredTableNumber);
        setHoveredTableInfo(hoveredTable || null);
    };

    const handleImageOnMouseLeave = () => {
      closeReservationInfo();
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
            refetchMyInfo();
            refetchReservationInfo();
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
        if (checkAvailability?.getReservations) {
          const reservedTableNumbers = checkAvailability.getReservations.map(
            (reservation: number) => reservation
          );
    
          setIsReserved(reservedTableNumbers);
        }
      }, [checkAvailability]);

      const calculateRatio = (reserved: number | undefined, cancelled: number | undefined): number => {
        if (reserved !== undefined && cancelled !== undefined) {
          const total = reserved + cancelled;
          return (reserved / total) * 100;
        }
        return 0;
      };

      const getColorByRatio = (reserved: number | undefined, cancelled: number | undefined): string => {
        const ratio = calculateRatio(reserved, cancelled);
      
        switch (true) {
          case ratio >= 50 && ratio <= 70:
            return 'red';
          case ratio > 70 && ratio <= 90:
            return 'orange';
          case ratio > 90 && ratio <= 100:
            return 'green';
          default:
            return '#5cbdb9';
        }
      };

      return (
        <>
          {token && isAdmin ? (
            <div className='flex sm:flex-row flex-col relative'>
              <div className='relative w-[90vw]'>
                <img
                  className='shadow-xl sm:h-[80vh] h-[50vh] m-auto sm:w-[60%] z-0 rounded-lg'
                  src={restaurant}
                  alt='Restaurant Floor Plan'
                />
                {[...Array(10).keys()].map((index) => (
                  <Table
                    key={index}
                    index={index}
                    handleImageOnMouseEnter={handleImageOnMouse}
                    handleImageOnMouseLeave={handleImageOnMouseLeave}
                    isReserved={isReserved.includes(index + 1)}
                    isMyTable={isReserved.includes(index + 1)}
                    onCancelReservation={handleCancelReservation}
                  />
                ))}
              </div>
              <div className='font-epilogue sm:w-[19vw] w-[90vw] h-[22vh] absolute sm:left-[20%] left-[-4px] sm:bottom-[1px] bottom-[-50%] rounded-lg text-left p-4'>
                <label htmlFor=''>Date: </label>
                <input type='date' name='' id='' value={filterDate} onChange={handleDateChange} />
                <br />
                <label htmlFor='lunch'>Lunch </label>
                <input
                  type='radio'
                  name='mealType'
                  id='lunch'
                  value='lunch'
                  checked={filterMealType === 'lunch'}
                  onChange={handleMealTypeChange}
                />
                <br />
                <label htmlFor='dinner'>Dinner </label>
                <input
                  type='radio'
                  name='mealType'
                  id='dinner'
                  value='dinner'
                  checked={filterMealType === 'dinner'}
                  onChange={handleMealTypeChange}
                />
              </div>
              {isInfoOpen && hoveredTableInfo && (
                <div className="absolute top-0 left-0 w-auto h-auto bg-white p-8 rounded shadow-lg">
                  <div className="font-epilogue font-bold text-[#5cbdb9]">
                    Table: {hoveredTableInfo?.tableNumber} <br />
                    Name: {hoveredTableInfo?.user.name} <br />
                    Persons: {hoveredTableInfo?.persons} <br />
                    Time: {hoveredTableInfo?.time} <br />
                    <span style={{ color: getColorByRatio(hoveredTableInfo?.user.reserved, hoveredTableInfo?.user.cancelled) }}>
                      Ratio: {calculateRatio(hoveredTableInfo?.user.reserved, hoveredTableInfo?.user.cancelled).toFixed(2)}%
                    </span>

                  </div>
                </div>
              )}
              {isCancelConfirmationOpen && (
                <div className='z-20 fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50'>
                  <div className='bg-white p-8 rounded shadow-lg'>
                    <div className='modal-content'>
                      <h1 className='font-epilogue font-bold text-[#5cbdb9]'>Cancel Reservation</h1>
                      <br />
                      <br />
                      <p>Are you sure you want to cancel this reservation?</p>
                      <div className='flex justify-between mt-4'>
                        <button
                          className='font-epilogue font-semibold text-[16px] leading-[26px] text-[white] bg-[#5cbdb9] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#fbe3e8]'
                          onClick={confirmCancelReservation}
                        >
                          Yes
                        </button>
                        <button
                          className='font-epilogue font-semibold text-[16px] leading-[26px] text-[#5cbdb9] bg-[#fbe3e8] min-h-[52px] px-4 rounded-[10px] border border-solid border-[#5cbdb9]'
                          onClick={closeCancelConfirmation}
                        >
                          No
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <div className="w-auto h-auto flex justify-center items-center">
                <div className="w-[300px] h-[200px] bg-[white] border border-solid border-[#fbe3e8] rounded-[10px] shadow-lg flex justify-center items-center">
                <p className="w-[180px] h-[100px] font-epilogue font-bold text-[#5cbdb9]">You don't have admin rights!</p>
                </div>
            </div>
            
          )}
        </>
      );
      
    }
export default Admin
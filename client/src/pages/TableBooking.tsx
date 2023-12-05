import React from 'react'
import { table } from '../assets'

const TableBooking: React.FC = () => {
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-25' src={table} alt="Table image" width={200} height={100}/></div>
      </div>

      <div className='flex flex-row justify-normal gap-2'>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
        <div className='sm:ml-8 ml-2 basis-1/3'><img className='cursor-pointer opacity-75' src={table} alt="Table image" width={200} height={100}/></div>
      </div>
    </div>
  )
}

export default TableBooking
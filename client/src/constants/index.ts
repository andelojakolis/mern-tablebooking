import { book, dashboard } from '../assets';

export interface NavLink {
    name: string;
    imgUrl: string;
    link: string;
    disabled?: boolean;
}

export const navlinks: NavLink[] = [
  {
    name: 'Home',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'Book a table',
    imgUrl: book,
    link: '/table-booking',
  },
];

export const tableStyles = [
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] left-[45%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] sm:left-[55%] left-[60%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[30%] sm:left-[65%] left-[75%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[45%] sm:left-[50%] left-[55%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute top-[45%] sm:left-[60%] left-[70%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[20%] sm:left-[50%] left-[55%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[20%] sm:left-[60%] left-[70%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] left-[45%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] sm:left-[54%] left-[59%]',
  'sm:ml-8 ml-2 basis-1/3 z-10 absolute bottom-[3%] sm:left-[63%] left-[72%]',
];
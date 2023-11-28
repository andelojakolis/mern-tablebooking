import { book, dashboard, logout, profile } from '../assets';

export interface NavLink {
    name: string;
    imgUrl: string;
    link: string;
    disabled?: boolean;
}

export const navlinks: NavLink[] = [
  {
    name: 'dashboard',
    imgUrl: dashboard,
    link: '/',
  },
  {
    name: 'bookTable',
    imgUrl: book,
    link: '/table-booking',
  },
  {
    name: 'profile',
    imgUrl: profile,
    link: '/profile',
  },
  {
    name: 'logout',
    imgUrl: logout,
    link: '/',
  },
];
type SvgProps = {
    width?: string;
    height?: string;
  };


import dashboard from './dashboard.svg';
import book from './book.svg';
import forkknife from './forkknife.svg';
import loader from './loader.svg';
import hamburgerMenu from './hamburgerMenu.svg';
import table from './table.png';
import restaurant from './restaurant-floor-plan.jpg';
import admin from './admin.svg';

// Exporting type for SVG components, adjust this based on your SVG component props
export type { SvgProps };

export {
  dashboard,
  loader,
  book,
  forkknife,
  hamburgerMenu,
  table,
  restaurant,
  admin
};

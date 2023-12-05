type SvgProps = {
    // Define the props for your SVG components here
    // For example:
    width?: string;
    height?: string;
    // Add more props as needed
  };


import dashboard from './dashboard.svg';
import book from './book.svg';
import forkknife from './forkknife.svg';
import logout from './logout.svg';
import profile from './profile.svg';
import search from './search.svg';
import loader from './loader.svg';
import hamburgerMenu from './hamburgerMenu.svg';
import table from './table.png'

// Exporting type for SVG components, adjust this based on your SVG component props
export type { SvgProps };

export {
  dashboard,
  logout,
  profile,
  search,
  loader,
  book,
  forkknife,
  hamburgerMenu,
  table
};

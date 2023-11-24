import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar, Sidebar } from './components'
import { Home, Profile, TableBooking } from './pages'

function App() {

  return (
    <Router>
      <div className='relative sm:-8 p-4 min-h-screen flex flex-row'>
        <div className='sm:flex hidden mr-10 relative'>
          <Sidebar />
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/table-booking' element={<TableBooking />} />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

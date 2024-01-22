import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import { Navbar, Sidebar } from './components'
import { Home, TableBooking, Register, Login } from './pages'
import Review from './pages/Review';
import Admin from './pages/Admin';

function App() {

  return (
    <Router>
      <div className='bg-[#ebf6f5] relative sm:-8 p-4 min-h-screen flex flex-row'>
        <div className='sm:flex hidden relative'>
          <Sidebar />
        </div>
        <div className='flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5'>
          <Navbar />
          <Routes>
              <Route path='/' element={<Home />} />
              <Route path='/register' element={<Register />} />
              <Route path='/login' element={<Login />} />
              <Route path='/table-booking' element={<TableBooking />} />
              <Route path='/review' element={<Review />} />
              <Route path='/admin' element={<Admin />} />
            </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

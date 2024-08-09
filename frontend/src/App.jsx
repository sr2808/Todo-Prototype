import React from 'react'
import Home from './components/Home'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; // Ensure you import the CSS for Toastify

const App = () => {
  return (
    <div className='h-full w-full'>
      <Home />
      <ToastContainer /> {/* Place ToastContainer here */}
    </div>
  )
}

export default App

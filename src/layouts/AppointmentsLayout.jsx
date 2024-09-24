
import { Outlet } from 'react-router-dom'
import NavBar from '../components/NavBar'
import { ToastContainer } from 'react-toastify'
import "react-toastify/ReactToastify.css"
import { useAuth } from '../hooks/useAuth'

export default function AppointmentsLayout() {

  const {} = useAuth({middleware: 'auth'})


  return (
    <>
      <NavBar />

      <div className='mx-5 md:mx-40 mt-10'>
        <h1 className='uppercase font-black text-4xl'>Citas</h1>
        <Outlet />
      </div>

      <ToastContainer></ToastContainer>
    
    </>
  )
}

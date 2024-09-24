import { Outlet } from 'react-router-dom'
import NavBar from "../components/NavBar";
import { useAuth } from '../hooks/useAuth'
import { ToastContainer } from 'react-toastify'

export default function PetOwnersLayout() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <>
      <NavBar />

      <div className='mx-5 md:mx-40 mt-10'>
        <h1 className='uppercase font-black text-4xl'>Dueños</h1>
        <Outlet />
      </div>

      <ToastContainer></ToastContainer>
    </>
  )
}

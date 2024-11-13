import React from 'react'
import NavBar from '../components/NavBar'
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'

export default function DoctorsLayout() {

  return (
    <>
      <NavBar />

      <div className='mx-5 md:mx-40 mt-10'>
        <h1 className='uppercase font-black text-4xl'>Doctores</h1>
        <Outlet />
      </div>

      <ToastContainer></ToastContainer>

    </>
  )
}

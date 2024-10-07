import React from 'react'
import AppointmentList from '../components/AppointmentList'
import { useAuth } from '../hooks/useAuth'

export default function Appointments() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <AppointmentList />
  )
}

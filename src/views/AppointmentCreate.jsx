import React from 'react'
import AppointmentForm from '../components/AppointmentForm'
import { useAuth } from '../hooks/useAuth'

export default function AppointmentCreate() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <AppointmentForm />
  )
}

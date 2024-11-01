import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import router from './router'
import './index.css'
import { AppointmentProvider } from './context/AppointmentProvider'
import { PetOwnerProvider } from './context/PetOwnerProvider'
import { PetProvider } from './context/PetProvider'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AppointmentProvider>
        <PetOwnerProvider>
          <PetProvider>
            <RouterProvider router={router} />
          </PetProvider>
        </PetOwnerProvider>
      </AppointmentProvider>
  </React.StrictMode>,
)

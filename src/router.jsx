import { createBrowserRouter } from "react-router-dom";
import AuthLayout from "./layouts/AuthLayout";
import Login from "./views/Login";
import Register from "./views/Register";
import AppointmentsLayout from "./layouts/AppointmentsLayout";
import AppointmentCreate from "./views/AppointmentCreate"
import Appointments from "./views/Appointments";
import PetOwners from "./views/PetOwners";
import PetOwnerCreate from "./views/PetOwnerCreate";
import PetOwnersLayout from "./layouts/PetOwnersLayout";
import PetOwnerEdit from "./views/PetOwnerEdit";
import PetOwnerDetails from "./views/PetOwnerDetails";
import PetsLayout from "./layouts/PetsLayout";
import Pets from "./views/Pets";
import PetCreate from "./views/PetCreate";
import PetEdit from "./views/PetEdit";
import DoctorsLayout from "./layouts/DoctorsLayout";
import Doctors from "./views/Doctors";


const router = createBrowserRouter([
    {
        path: '/',
        element: <AppointmentsLayout />,
        children: [
            {
                path: 'appointments-create',
                element: <AppointmentCreate />
            },
            {
                path: 'appointments',
                element: <Appointments />
            }
        ]
    },
    {
        path: 'auth',
        element: <AuthLayout />,
        children: [
            {
                path: '/auth/login',
                element: <Login />
            },
            {
                path: '/auth/register',
                element: <Register />
            }
        ]
    },
    {
        path: 'pet-owners',
        element: <PetOwnersLayout />,
        children: [
            {
                path: '/pet-owners/create',
                element: <PetOwnerCreate />
            },
            {
                path: '/pet-owners/list',
                element: <PetOwners />
            },
            {
                path: '/pet-owners/edit/:id',
                element: <PetOwnerEdit />
            },
            {
                path: '/pet-owners/details/:id',
                element: <PetOwnerDetails />
            }
        ]
    },
    {
        path: 'pets',
        element: <PetsLayout />,
        children: [
            {
                path: '/pets/list',
                element: <Pets />
            },
            {
                path: '/pets/create',
                element: <PetCreate />
            },
            {
                path: '/pets/edit/:id',
                element: <PetEdit />
            }
        ]
    },
    {
        path: 'doctors',
        element: <DoctorsLayout />,
        children: [
            {
                path: '/doctors/list',
                element: <Doctors />
            }
        ]
    }
])

export default router
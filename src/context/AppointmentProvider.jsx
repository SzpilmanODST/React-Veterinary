import { createContext, useEffect, useReducer, useState } from "react";
import axiosClient from "../config/axios";
import { appointmentReducer, initialState } from "./AppointmentReducer"; 
import { toast } from "react-toastify";

const AppointmentContext = createContext();

const AppointmentProvider = ({children}) => {

    const [state, dispatch] = useReducer(appointmentReducer, initialState);
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [specificPage, setSpecificPage] = useState('');
    const [petOwnerName, setPetOwnerName] = useState('');
    const [petOwnerLastName, setPetOwnerLastName] = useState('');
    const [petOwnerCellphone, setPetOwnerCellphone] = useState('');
    const [dayAndHour, setDayAndHour] = useState('');

    // Index
    const indexAppointments = async (page, petOwnerName, petOwnerLastName, petOwnerCellphone, dayAndHour) => {
        try {
            const {data} = await axiosClient(`/api/appointments?pet_owner_name=${petOwnerName}
                                            &pet_owner_last_name=${petOwnerLastName}
                                            &pet_owner_cellphone=${petOwnerCellphone}
                                            &day_and_hour=${dayAndHour}&page=${page}`);

            dispatch({ type: 'FETCH_APPOINTMENTS_SUCCESS', payload: data.data });
            setLastPage(data.meta.last_page)

        } catch(error) {
            dispatch({ type: 'FETCH_APPOINTMENTS_ERROR', payload: error.message });
        }
    }

    // Store
    const addAppointment = async (appointment) => {
        try {
            const {data} = await axiosClient.post('/api/appointments', appointment);
            dispatch({ type: 'ADD_APPOINTMENT', payload: data.data });
            setErrors([])
            toast.success("Cita agendada correctamente")
            return { success: true };
            
        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
            console.log(errors)
            return { success: false };
            
        }
    }

    // Delete
    const deleteAppointment = async (id) => {
        try {
            await axiosClient.delete(`/api/appointments/${id}`);
            dispatch({type: 'DELETE_APPOINTMENT', payload: id});
            toast.success("Cita eliminada correctamente")

        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        indexAppointments(currentPage, petOwnerName, petOwnerLastName, petOwnerCellphone, dayAndHour)
        
    }, [currentPage, petOwnerName, petOwnerLastName, petOwnerCellphone, dayAndHour]);

    const handleNextPage = () => {
        if (currentPage < lastPage) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handleSpecificPage = (e) => {
        e.preventDefault();
        setSpecificPage(Number(e.target.value))

    }

    const handlePage = (e) => {
        e.preventDefault();
        setCurrentPage(Number(specificPage))
    }


    const handleSerchByPetOwnerName = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPetOwnerName(e.target.value)
    }

    const handleSerchByPetOwnerLastName = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPetOwnerLastName(e.target.value)
    }

    const handleSerchByPetOwnerCellphone = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPetOwnerCellphone(e.target.value)
    }

    const handleSerchByDayAndHour = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setDayAndHour(e.target.value)
    }
    
    return (
        <AppointmentContext.Provider
            value={{
                ...state,
                errors,
                indexAppointments,
                addAppointment,
                deleteAppointment,
                currentPage,
                lastPage,
                handleNextPage,
                handlePreviousPage,
                handleSpecificPage,
                handlePage,
                handleSerchByPetOwnerName,
                handleSerchByPetOwnerLastName,
                handleSerchByPetOwnerCellphone,
                handleSerchByDayAndHour,

            }}
        >{children}</AppointmentContext.Provider>
    )
}

export {
    AppointmentProvider
}

export default AppointmentContext
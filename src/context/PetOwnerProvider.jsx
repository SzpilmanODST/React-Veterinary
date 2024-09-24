import axiosClient from "../config/axios"
import { createContext, useEffect, useReducer, useState } from "react"
import { petOwnerReducer, initialState } from "./PetOwnerReducer";
import { toast } from "react-toastify";

const PetOwnerContext = createContext();

const PetOwnerProvider = ({children}) => {

    const [state, dispatch] = useReducer(petOwnerReducer, initialState);
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [specificPage, setSpecificPage] = useState('');
    const [petOwnerName, setPetOwnerName] = useState('');
    const [petOwnerLastName, setPetOwnerLastName] = useState('');
    const [petOwnerCellphone, setPetOwnerCellphone] = useState('');
    const [petOwnerEmail, setPetOwnerEmail] = useState('');

    // Index
    const indexPetOwners = async (page, name, lastName, cellphone, email) => {
        try {
            const {data} = await axiosClient(`/api/pet-owners?name=${name}&last_name=${lastName}
                                            &cellphone=${cellphone}&email=${email}&page=${page}`);
            dispatch({type: 'FETCH_PETOWNERS_SUCCES', payload: data.data})
            setLastPage(data.meta.last_page)

        } catch(error) {
            dispatch({ type: 'FETCH_APPOINTMENTS_ERROR', payload: error.message });
        }
    }

    // Store
    const addPetOwner = async (petOwner) => {
        try {
            const {data} = await axiosClient.post('/api/pet-owners', petOwner);
            dispatch({ type: 'ADD_PETOWNER', payload: data.data });
            setErrors([])
            toast.success("Dueño registrado correctamente")
            return { success: true };
            
        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
            return { success: false };
            
        }
    }

    // Show
    const showPetOwner = async (id) => {
        try {
            const data = await axiosClient(`/api/pet-owners/${id}`);
            dispatch({ type: 'FETCH_PETOWNER_SUCCESS', payload: data.data})
            return data.data.petOwner

        } catch(error) {
            console.log(error)
        }
    }

    // Update
    const updatePetOwner = async (id, dataResponse) => {
        try {
            const data = await axiosClient.put(`/api/pet-owners/${id}`, dataResponse)
            dispatch({ type: 'UPDATE_PETOWNER', payload: data.data})
            setErrors([]);
            toast.success("Dueño actualizado correctamente"); 
            return { success: true };

        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
            return { success: false };
        }
        
    }

    // Delete
    const deletePetOwner = async (id) => {
        try {
            await axiosClient.delete(`/api/pet-owners/${id}`);
            dispatch({type: 'DELETE_PETOWNER', payload: id});
            toast.success("Dueño eliminado correctamente")

        } catch(error) {
            console.log(error)
        }
    }

    useEffect(() => {
        indexPetOwners(currentPage, petOwnerName, petOwnerLastName, petOwnerCellphone, petOwnerEmail)
    }, [currentPage, petOwnerName, petOwnerLastName, petOwnerCellphone, petOwnerEmail]);

    const handleSerchByPetOwnerName = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPetOwnerName(e.target.value)
    }

    const handleSerchByPetOwnerLastName = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        setPetOwnerLastName(e.target.value)
    }

    const handleSerchByPetOwnerCellphone = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        setPetOwnerCellphone(e.target.value)
    }

    const handleSerchByPetOwnerEmail = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        setPetOwnerEmail(e.target.value)
    }

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

    return (
        <PetOwnerContext.Provider
            value={{
                ...state,
                errors,
                indexPetOwners,
                addPetOwner,
                showPetOwner,
                updatePetOwner,
                deletePetOwner,
                handleNextPage,
                handlePreviousPage,
                handleSpecificPage,
                handlePage,
                currentPage,
                lastPage,
                handleSerchByPetOwnerName,
                handleSerchByPetOwnerLastName,
                handleSerchByPetOwnerCellphone,
                handleSerchByPetOwnerEmail
            }}
        >{children}</PetOwnerContext.Provider>
    )
    
}

export {
    PetOwnerProvider
}

export default PetOwnerContext
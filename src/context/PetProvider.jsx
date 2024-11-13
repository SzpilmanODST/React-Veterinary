import { createContext, useEffect, useReducer, useState } from "react"
import { initialState, petReducer } from "./PetReducer";
import axiosClient from "../config/axios";
import { toast } from "react-toastify";

const PetContext = createContext();

const PetProvider = ({children}) => {

    const [state, dispatch] = useReducer(petReducer, initialState);
    const [errors, setErrors] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [specificPage, setSpecificPage] = useState('');
    const [petName, setPetName] = useState('');
    const [petBreed, setPetBreed] = useState('');

    // Index
    const indexPets = async (page, name, breed) => {
        try {
            const {data} = await axiosClient(`/api/pets?name=${name}&breed=${breed}&page=${page}`);
            dispatch({type: 'FETCH_PETS_SUCCES', payload: data.data})
            setLastPage(data.meta.last_page)

        } catch(error) {
            dispatch({ type: 'FETCH_APPOINTMENTS_ERROR', payload: error.message });
        }
    }

    // Store
    const addPet = async (pet) => {
        try {
            const data = await axiosClient.post('/api/pets', pet);
            dispatch({type: 'ADD_PET', payload: data.data});
            setErrors([]);
            toast.success("Mascota registrada correctamente")
            return { success: true };

        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
            return { success: false };
        }
    }

    // Show
    const showPet = async (id) => {
        try {
            const data = await axiosClient(`/api/pets/${id}`);
            dispatch({type: 'FETCH_PET_SUCCESS', payload: data.data});
            return data.data;

        } catch(error) {
            console.log(error)
        }
    }

    // Update
    const updatePet = async (id, dataResponse) => {
        try {
            const data = await axiosClient.put(`/api/pets/${id}`, dataResponse);
            dispatch({ type: 'UPDATE_PET', payload: data.data})
            setErrors([]);
            toast.success("Mascota actualizada correctamente"); 
            return { success: true };

        } catch(error) {
            setErrors(Object.values(error.response.data.errors))
            return { success: false };
        }
    }

    // Delete
    const deletePet = async (id) => {
        try {
            const data = await axiosClient.delete(`/api/pets/${id}`);
            dispatch({ type: 'DELETE_PET', payload: data.data});
            toast.success("Mascota eliminada correctamente")
            indexPets(1, '', '');

        } catch(error) {
            console.log(error)
        }
    }


    useEffect(() => {
        indexPets(currentPage, petName, petBreed)
    }, [currentPage, petName, petBreed]);

    const handleSerchByPetName = (e) => {
        e.preventDefault()
        setCurrentPage(1)
        setPetName(e.target.value)
    }

    const handleSerchByPetBreed = (e) => {
        e.preventDefault();
        setCurrentPage(1)
        setPetBreed(e.target.value)
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
        <PetContext.Provider
            value={{
                ...state,
                errors,
                indexPets,
                addPet,
                showPet,
                updatePet,
                deletePet,
                currentPage,
                lastPage,
                handleNextPage,
                handlePreviousPage,
                handleSpecificPage,
                handlePage,
                handleSerchByPetName,
                handleSerchByPetBreed
            }}
        >{children}</PetContext.Provider>
    )
}

export {
    PetProvider
}

export default PetContext

import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import usePet from '../hooks/usePet';
import PetForm from './PetForm';

export default function PetUpdate() {

    const {id} = useParams();
    const {showPet, updatePet, indexPets} = usePet();
    const [petData, setPetData] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const data = await showPet(id);
            setPetData(data.pet);
        }

        fetchData();

    }, [id]);

    const handleUpdate = async (dataResponse) => {
        const data = await updatePet(id, dataResponse);
        await indexPets(1, '', '');

        if(data.success) {
            navigate('/pets/list')
        }
    }
    
    return petData ? (<PetForm initialData={petData} onSubmit={handleUpdate} />) : (<p>Cargando...</p>);
}

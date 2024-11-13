import { useNavigate } from "react-router-dom";
import usePet from "../hooks/usePet"
import PetForm from "./PetForm";


export default function PetPost() {

    const {indexPets, addPet} = usePet();
    const navigate = useNavigate();

    const handleCreate = async (dataResponse) => {
        const data = await addPet(dataResponse);
        await indexPets(1, '', '');

        console.log(data)

        if(data.success) {
            navigate('/pets/list')
        }
    }

  return <PetForm onSubmit={handleCreate} />
}

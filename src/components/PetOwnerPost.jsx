import { useNavigate } from "react-router-dom"
import PetOwnerForm from "./PetOwnerForm"
import usePetOwner from "../hooks/usePetOwner"

export default function PetOwnerPost() {

  const {addPetOwner, indexPetOwners} = usePetOwner();
  const navigate = useNavigate();

  const handleCreate = async (dataResponse) => {
    const data = await addPetOwner(dataResponse);
    await indexPetOwners(1, '', '', '', '');

    if(data.success) {
      navigate('/pet-owners/list')
    }
  }

  return <PetOwnerForm onSubmit={handleCreate} />
  
}



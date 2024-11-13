import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import PetOwnerForm from "./PetOwnerForm"
import usePetOwner from "../hooks/usePetOwner"

export default function PetOwnerUpdate() {

  const {id} = useParams();
  const {showPetOwner, updatePetOwner, indexPetOwners} = usePetOwner();
  const [petOwnerData, setPetOwnerData] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const data = await showPetOwner(id);
      setPetOwnerData(data.petOwner);

    };

    fetchData();

  }, [id]);

  const handleUpdate = async (dataResponse) => {
    const data = await updatePetOwner(id, dataResponse)
    await indexPetOwners(1, '', '', '', '')

    if(data.success) {
      navigate('/pet-owners/list')
    }
  }

  return petOwnerData ? (<PetOwnerForm initialData={petOwnerData} onSubmit={handleUpdate} />) : (<p>Cargando...</p>);
}

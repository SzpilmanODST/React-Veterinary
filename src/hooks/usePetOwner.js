import { useContext } from "react";
import PetOwnerContext from "../context/PetOwnerProvider";

const usePetOwner = () => {
    return useContext(PetOwnerContext)
}

export default usePetOwner
import { useContext } from "react";
import PetContext from "../context/PetProvider";

const usePet = () => {
    return useContext(PetContext)
}

export default usePet

import PetOwnerUpdate from "../components/PetOwnerUpdate";
import { useAuth } from "../hooks/useAuth";

export default function PetOwnerEdit() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <PetOwnerUpdate />
  )
}

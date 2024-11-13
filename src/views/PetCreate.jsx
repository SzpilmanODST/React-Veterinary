import PetPost from "../components/PetPost";
import { useAuth } from "../hooks/useAuth"


export default function PetCreate() {

    const {} = useAuth({middleware: 'auth'});

  return (
    <>
        <PetPost />
    </>
  )
}

import PetOwnerList from '../components/PetOwnerList'
import { useAuth } from '../hooks/useAuth'

export default function PetOwners() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <>
      <PetOwnerList /> 
    </>
    
  )
}

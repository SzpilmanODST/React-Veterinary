import PetOwnerPost from '../components/PetOwnerPost'
import { useAuth } from '../hooks/useAuth'

export default function PetOwnerCreate() {

  const {} = useAuth({middleware: 'auth'})

  return (
    <>
      <PetOwnerPost />
    </>
  )
}

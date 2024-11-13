import PetUpdate from '../components/PetUpdate'
import { useAuth } from '../hooks/useAuth'

export default function PetEdit() {

    const {} = useAuth({middleware: 'auth'})

  return (
    <PetUpdate />
  )
}

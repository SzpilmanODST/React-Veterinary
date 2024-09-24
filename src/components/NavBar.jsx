import { useAuth } from '../hooks/useAuth'

export default function NavBar() {

  const {user, error, logout} = useAuth({middleware: 'guest'})


  return (
    <nav 
        className="bg-teal-500 w-full p-3 flex justify-between"
    >
        <h1 className="text-white font-bold text-2xl">Veterinaria Petunia</h1>
        {user ? <a className='text-white font-bold' href={"/pet-owners/list"}>Dueños</a> : null}
        {user ? <button className='text-white font-bold' onClick={logout}>Cerrar sesión</button> : null}
        
    </nav>
  )
}

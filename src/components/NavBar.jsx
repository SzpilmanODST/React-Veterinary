import { useAuth } from '../hooks/useAuth'

export default function NavBar() {

  const {user, error, logout} = useAuth({middleware: 'guest'})


  return (
    <nav 
        className="bg-teal-500 w-full p-3 flex justify-between"
    >
        <a className="text-white font-bold text-2xl" href='/appointments'>Veterinaria Petunia</a>
        {user ? <a className='text-white font-bold' href={"/pet-owners/list"}>Dueños</a> : null}
        {user ? <button className='text-white font-bold' onClick={logout}>Cerrar sesión</button> : null}
        
    </nav>
  )
}

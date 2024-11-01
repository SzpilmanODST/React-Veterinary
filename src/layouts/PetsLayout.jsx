import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function PetsLayout() {
  return (
    <>
        <NavBar />

        <div className='mx-5 md:mx-40 mt-10'>
            <h1 className='uppercase font-black text-4xl'>Mascotas</h1>
            <Outlet />
        </div>
    </>
  )
}

import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function AuthLayout() {
  return (
    <>
    <NavBar />

    <main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
        <img 
            src="../img/logo.jpg" 
            alt="Imagen Logo" 
            className="max-w-xs"
        />

        <div className="p-10 w-full">
            <Outlet />
        </div>
    </main> 
    </>
  )
}

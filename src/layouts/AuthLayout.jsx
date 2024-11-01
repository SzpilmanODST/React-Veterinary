import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";


export default function AuthLayout() {
  return (
    <>
    <NavBar />

    <div className="p-10 w-5/12 m-auto">
      <Outlet />
    </div>

    {/*<main className="max-w-4xl m-auto mt-10 md:mt-28 flex flex-col md:flex-row items-center">
        <img 
            src="../img/logo.jpg" 
            alt="Imagen Logo" 
            className="max-w-xs"
        />

        
    </main>*/}
    </>
  )
}

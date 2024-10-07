import { useEffect, useState } from 'react'
import usePetOwner from '../hooks/usePetOwner'
import { useParams } from 'react-router-dom';

export default function PetOwnerShow() {

    const {id} = useParams();
    const {showPetOwner, loading} = usePetOwner();
    const [dataPetOwner, setDataPetOwner] = useState(null);
    const [dataAppointments, setDataAppointments] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const data = await showPetOwner(id, "", 1);

            setDataPetOwner(data.petOwner);
            setDataAppointments(data.appointments);
            
        }

        fetchData();
        
    }, [id]);

    if(!dataPetOwner) return 'Cargando datos...';

  return (
    <>
        <h1 className='text-2xl font-black mt-10'>Datos del dueño</h1>

        <div className='bg-white shadow-md rounded-md mt-3 px-5 py-10'>
            <p className='text-slate-800'>Id: {dataPetOwner.id}</p>
            <p className='text-slate-800'>Nombre completo: {dataPetOwner.name} {dataPetOwner.last_name}</p>
            <p className='text-slate-800'>Celular: {dataPetOwner.cellphone}</p>
            <p className='text-slate-800'>Email: {dataPetOwner.email}</p>
        </div>

        <h1 className='text-2xl font-black mt-10'>Lista de citas</h1>
        
        <table className='w-full m-auto my-5 text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-2'>Id</th>
                <th>Día y hora</th>
                <th>Prescripción</th>
                <th>Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {dataAppointments.map((appointment) => (
                <tr key={appointment.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='py-3 px-2'>{appointment.id}</td>
                    <td>{appointment.day_and_hour} horas</td>
                    <td>Ver</td>
                    <td>
                      <button
                        onClick={() => deleteAppointment(appointment.id)}
                        className='rounded bg-rose-600 hover:bg-rose-800 text-white my-2 p-3  cursor-pointer'
                      >
                        Eliminar
                      </button>
                    </td>
                </tr>
              ))}
            </tbody>
      </table>
    </>
    )
  
}

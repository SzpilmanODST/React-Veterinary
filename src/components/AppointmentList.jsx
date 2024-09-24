import useAppointment from '../hooks/useAppointment'


export default function AppointmentList() {

    const { appointments, loading, deleteAppointment, currentPage, lastPage, 
      handleNextPage, handlePreviousPage, handleSpecificPage, handlePage, 
      handleSerchByPetOwnerName, handleSerchByPetOwnerLastName, handleSerchByPetOwnerCellphone,
      handleSerchByDayAndHour } = useAppointment()

    

    if(loading) return 'Cargando...';

  return (
    <>
      <div className='flex items-end my-10'>
        <div className='basis-1/3'>
          <p className='text-slate-800'>Filtros de busqueda</p>
          <input
            type="text" 
            onChange={handleSerchByPetOwnerName}
            className='mt-2 w-full p-3 bg-gray-50'
            placeholder='Nombre'
          />
          <input
            type="text" 
            onChange={handleSerchByPetOwnerLastName}
            className='mt-2 w-full p-3 bg-gray-50'
            placeholder='Apellido'
          />
          <input
            type="text" 
            onChange={handleSerchByPetOwnerCellphone}
            className='mt-2 w-full p-3 bg-gray-50'
            placeholder='Celular'
          />
          <input
            type="text" 
            onChange={handleSerchByDayAndHour}
            className='mt-2 w-full p-3 bg-gray-50'
            placeholder='Fecha y hora'
          />
        </div>

        <div className='flex basis-2/3 justify-end'>
          <a 
            href="/appointments-create" 
            className='rounded bg-cyan-600 hover:bg-cyan-800 text-white p-3 uppercase font-bold cursor-pointer'
          >
            Agendar cita
          </a>
        </div>
      </div>

      <table className='w-full m-auto mb-5 text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-2'>Id</th>
                <th>Día y hora</th>
                <th>Dueño</th>
                <th>Celular</th>
                <th>Prescripción</th>
                <th>Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {appointments.map((appointment) => (
                <tr key={appointment.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='py-3 px-2'>{appointment.id}</td>
                    <td>{appointment.day_and_hour} horas</td>
                    <td>{appointment.pet_owner.name + " " + appointment.pet_owner.last_name}</td>
                    <td>{appointment.pet_owner.cellphone}</td>
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

        <div className='flex justify-evenly mb-5'>
          <div>
            <button 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded"
              onClick={handlePreviousPage} disabled={currentPage === 1}>
              Anterior
            </button>

            <span className='px-4 py-2'>Página {currentPage} de {lastPage}</span>

            <button 
              className="px-4 py-2 bg-gray-100 hover:bg-gray-300 rounded"
              onClick={handleNextPage} disabled={currentPage === lastPage}>
              Siguiente
            </button>
          </div>
          
          <div className=''> 
            <form onSubmit={handlePage}>
                  <label>
                    N° de pagina:
                  </label>
                  <input
                    type="number" 
                    onChange={handleSpecificPage}
                    className="w-16 p-2 border rounded mx-2"
                  />
                  <button 
                    type='submit'
                    className='rounded bg-cyan-600 hover:bg-cyan-800 text-white px-4 py-2 cursor-pointer'
                  >
                    Ir
                  </button>
            </form>
          </div>
        </div>
    </>
  )
}

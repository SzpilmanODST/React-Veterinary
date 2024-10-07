import usePetOwner from '../hooks/usePetOwner';

export default function PetOwnerList() {

    const {petOwners, loading, deletePetOwner, handleNextPage, handlePreviousPage, 
          handleSpecificPage, handlePage, currentPage, lastPage, 
          handleSerchByPetOwnerName, handleSerchByPetOwnerLastName,
          handleSerchByPetOwnerCellphone,
          handleSerchByPetOwnerEmail} = usePetOwner();

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
            onChange={handleSerchByPetOwnerEmail}
            className='mt-2 w-full p-3 bg-gray-50'
            placeholder='Email'
          />
        </div>

        <div className='flex basis-2/3 justify-end'>
          <a 
            href="/pet-owners/create" 
            className='rounded bg-cyan-600 hover:bg-cyan-800 text-white p-3 uppercase font-bold cursor-pointer'
          >
            Registrar dueño
          </a>
        </div>
      </div>

        <table className='w-full m-auto mb-5 text-left'>
            <thead className='bg-gray-100'>
              <tr>
                <th className='py-3 px-2'>Id</th>
                <th>Nombre completo</th>
                <th>Celular</th>
                <th>Email</th>
                <th>Lista de citas</th>
                <th>Editar</th>
                <th>Eliminar</th>
              </tr>
            </thead>

            <tbody>
              {petOwners.map((petOwner) => (
                <tr key={petOwner.id} className='bg-white border-b dark:bg-gray-800 dark:border-gray-700'>
                    <td className='py-3 px-2'>{petOwner.id}</td>
                    <td>{petOwner.name + " " + petOwner.last_name}</td>
                    <td>{petOwner.cellphone}</td>
                    <td>{petOwner.email}</td>
                    <td>
                      <a
                        href={`/pet-owners/details/${petOwner.id}`}
                        className='rounded bg-teal-500 hover:bg-teal-800 text-white my-2 p-3  cursor-pointer'
                      >
                        Ver
                      </a>
                    </td>
                    <td>
                      <a
                        href={`/pet-owners/edit/${petOwner.id}`}
                        className='rounded bg-teal-500 hover:bg-teal-800 text-white my-2 p-3  cursor-pointer'
                      >
                        Editar
                      </a>
                    </td>
                    <td>
                      <button
                        onClick={() => deletePetOwner(petOwner.id)}
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

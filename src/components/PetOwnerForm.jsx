import { useRef, useEffect } from "react";
import usePetOwner from "../hooks/usePetOwner"
import { useNavigate } from 'react-router-dom';
import Alert from "./Alert";

export default function PetOwnerForm({initialData = null, onSubmit}) {

  const {errors} = usePetOwner();

  const nameRef = useRef(null);
  const last_nameRef = useRef(null);
  const cellphoneRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (initialData) {
      nameRef.current.value = initialData.name;
      last_nameRef.current.value = initialData.last_name;
      cellphoneRef.current.value = initialData.cellphone;
      emailRef.current.value = initialData.email;
    }

  }, [initialData]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      last_name: last_nameRef.current.value,
      cellphone: cellphoneRef.current.value,
      email: emailRef.current.value
    }

    onSubmit(data);
  }


  return (
    <>
      <div className='w-10/12 m-auto text-left'>
        <h1 className='text-4xl font-bold mt-10'>
          {initialData ? 'Editar dueño' : 'Registrar dueño'}
        </h1>

        <div className='bg-white shadow-md rounded-md my-5 px-5 py-10'>
          <form onSubmit={handleSubmit}>
            {errors ? errors.map(error => <Alert key={error}>{error}</Alert>) : null}
              <div className='mb-6'>
                <label
                  className='text-slate-800'
                  htmlFor='name'
                  >Nombre:</label>
                <input 
                  type="text" 
                  id='name'
                  name='name'
                  className='mt-2 w-full p-3 bg-gray-50'
                  placeholder='Nombre'
                  ref={nameRef}
                />
              </div>
              <div className='mb-6'>
                <label
                  className='text-slate-800'
                  htmlFor='lastName'
                  >Apellido:</label>
                <input 
                  type="text" 
                  id='lastName'
                  name='lastName'
                  className='mt-2 w-full p-3 bg-gray-50'
                  placeholder='Apellido'
                  ref={last_nameRef}
                />
              </div>
              <div className='mb-6'>
                <label
                  className='text-slate-800'
                  htmlFor='cellphone'
                  >Celular:</label>
                <input 
                  type="text" 
                  id='cellphone'
                  name='cellphone'
                  className='mt-2 w-full p-3 bg-gray-50'
                  placeholder='Celular'
                  ref={cellphoneRef}
                />
              </div>
              <div className='mb-6'>
                <label
                  className='text-slate-800'
                  htmlFor='email'
                  >Email:</label>
                <input 
                  type="email" 
                  id='email'
                  name='email'
                  className='mt-2 w-full p-3 bg-gray-50'
                  placeholder='Email'
                  ref={emailRef}
                />
              </div>

              <div className='flex justify-end'>
                <a 
                  href="/pet-owners/list"
                  className='rounded bg-rose-600 hover:bg-rose-800 text-white mt-4 mr-3 p-3 uppercase font-bold cursor-pointer'
                >
                    Cancelar
                </a>
                <input 
                  type="submit" 
                  value={initialData ? 'Guardar cambios' : 'Registrar dueño'}
                  className='rounded bg-cyan-600 hover:bg-cyan-800 text-white mt-4 p-3 uppercase font-bold cursor-pointer'
                />
              </div>
        </form>
      </div>
    </div>
    </>
  )
}

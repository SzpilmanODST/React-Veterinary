import {useRef, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import Alert from '../components/Alert';

export default function Register() {

  const {errors, register} = useAuth({
    middleware: 'guest',
    url: '/appointments'
  });

  const nameRef = useRef(null);
  const lastNameRef = useRef(null);
  const cellphoneRef = useRef(null);
  const roleRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const passwordConfirmationRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      name: nameRef.current.value,
      last_name: lastNameRef.current.value,
      cellphone: cellphoneRef.current.value,
      role: roleRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
      password_confirmation: passwordConfirmationRef.current.value
    }

    register(data)

  }

  return (
    <>
      <h1 className='text-4xl font-black'>Registrar trabajador</h1>
      <p>Registra a un nuevo trabajador (doctor o secretaria) llenando el siguiente formulario</p>

      <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
        <form 
          onSubmit={handleSubmit}
        >
          {errors ? errors.map(error => <Alert key={error}>{error}</Alert>) : null}
          <div className='mb-4'>
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
          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='last_name'
              >Apellido:</label>
            <input 
              type="text" 
              id='last_name'
              name='last_name'
              className='mt-2 w-full p-3 bg-gray-50'
              placeholder='Apellido'
              ref={lastNameRef}
            />
          </div>
          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='cellphone'
              >Celular:</label>
            <input 
              type="number" 
              id='cellphone'
              name='celular'
              className='mt-2 w-full p-3 bg-gray-50'
              placeholder='Celular'
              ref={cellphoneRef}
            />
          </div>

          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='role'
              >Rol:
              <select ref={roleRef} className='mt-2 w-full p-3 bg-gray-50'>
                <option value="doctor">Doctor</option>
                <option value="secretary">Secretario/a</option>
              </select>
            </label>
          </div>

          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='email'
              >Correo electrónico:</label>
            <input 
              type="email" 
              id='email'
              name='email'
              className='mt-2 w-full p-3 bg-gray-50'
              placeholder='Correo electrónico'
              ref={emailRef}
            />
          </div>
          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='password'
              >Contraseña:</label>
            <input 
              type="password" 
              id='password'
              name='password'
              className='mt-2 w-full p-3 bg-gray-50'
              placeholder='Contraseña'
              ref={passwordRef}
            />
          </div>
          <div className='mb-4'>
            <label
              className='text-slate-800'
              htmlFor='password_confirmation'
              >Repetir contraseña:</label>
            <input 
              type="password" 
              id='password_confirmation'
              name='password_confirmation'
              className='mt-2 w-full p-3 bg-gray-50'
              placeholder='Repetir contraseña'
              ref={passwordConfirmationRef}
            />
          </div>

          <input 
            type="submit" 
            value="Registrar trabajador"
            className='bg-cyan-600 hover:bg-cyan-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
          />
        </form>
      </div>
    </>
  )
}

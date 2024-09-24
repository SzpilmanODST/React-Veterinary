import {useRef, useState} from 'react';
import {useAuth} from '../hooks/useAuth';
import Alert from '../components/Alert';

export default function Login() {

  const {errors, login} = useAuth({
    middleware: 'guest',
    url: '/appointments'
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value
    }

    login(data);
  }

  return (
    <>
    <h1 className='text-4xl font-black'>Iniciar sesión</h1>
    <p>Ingresa tu correo y contraseña para iniciar sesión</p>

    <div className='bg-white shadow-md rounded-md mt-10 px-5 py-10'>
      <form
        onSubmit={handleSubmit}
      >
        {errors ? errors.map(error => <Alert key={error}>{error}</Alert>) : null}
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

        <input 
          type="submit" 
          value="Iniciar Sesión"
          className='bg-cyan-600 hover:bg-cyan-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer'
        />
      </form>
    </div>
  </>
  )
}

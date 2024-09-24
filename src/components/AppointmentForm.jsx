import { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAppointment from '../hooks/useAppointment';
import usePetOwner from '../hooks/usePetOwner';
import Select from 'react-select';
import Alert from './Alert';


export default function AppointmentForm() {

  const { addAppointment, indexAppointments, errors } = useAppointment();
  const { petOwners } = usePetOwner();
  const navigate = useNavigate();

  const day_and_hourRef = useRef(null);
  const pet_owner_idRef = useRef(null);

  const handleSelectValue = (selectedOption) => {
    pet_owner_idRef.current = selectedOption.value
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      day_and_hour: day_and_hourRef.current.value,
      pet_owner_id: pet_owner_idRef.current
    }

    const result = await addAppointment(data);
    await indexAppointments(1, '', '', '', '');

    if (result.success) {
      navigate('/appointments');
    }
    
  }
  
  return (
    <>
    <div className='w-10/12 m-auto text-left'>
      <h1 className='text-4xl font-bold mt-10'>Agendar cita</h1>

      <div className='bg-white shadow-md rounded-md mt-5 px-5 py-10'>
        <form onSubmit={handleSubmit}>
          {errors ? errors.map(error => <Alert key={error}>{error}</Alert>) : null}
              <div className='mb-6'>
                <label
                  className='text-slate-800'
                  htmlFor='day_and_hour'
                  >Día y hora:</label>
                <input 
                  type="datetime-local" 
                  id='day_and_hour'
                  name='day_and_hour'
                  className='mt-2 w-full p-3 bg-gray-50'
                  placeholder='Día y hora'
                  ref={day_and_hourRef}
                />
                <p>(Poner los minutos en :00)</p>
              </div>
              <div className='mb-4'>
                <label
                  className='text-slate-800'
                  htmlFor='pet_owner'
                  >Dueño:</label>
                <div>
                  <Select 
                    options={petOwners.map(petOwner => ({label: petOwner.cellphone, value: petOwner.id}))}
                    onChange={handleSelectValue}
                  />
                </div>
              </div>

              <div className='flex justify-end'>
                <a 
                  href="/appointments"
                  className='rounded bg-rose-600 hover:bg-rose-800 text-white mt-4 mr-3 p-3 uppercase font-bold cursor-pointer'
                >
                    Cancelar
                </a>
                <input 
                  type="submit" 
                  value="Agendar cita"
                  className='rounded bg-cyan-600 hover:bg-cyan-800 text-white mt-4 p-3 uppercase font-bold cursor-pointer'
                />
              </div>
        </form>
      </div>
    </div>
    </>
  )
}

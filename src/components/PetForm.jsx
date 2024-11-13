import { useEffect, useRef } from "react"
import usePet from "../hooks/usePet";
import Alert from "./Alert";
import usePetOwner from "../hooks/usePetOwner";
import Select from 'react-select';

export default function PetForm({initialData = null, onSubmit}) {

    const {errors} = usePet();
    const {petOwners} = usePetOwner();

    const nameRef = useRef(null);
    const genderRef = useRef(null);
    const speciesRef = useRef(null);
    const breedRef = useRef(null);
    const ageRef = useRef(null);
    const weightRef = useRef(null);
    const pet_owner_idRef = useRef(null);

    useEffect(() => {
        if(initialData) {
            nameRef.current.value = initialData.name;
            genderRef.current.value = initialData.gender;
            speciesRef.current.value = initialData.species;
            breedRef.current.value = initialData.breed;
            ageRef.current.value = initialData.age;
            weightRef.current.value = initialData.weight;
            pet_owner_idRef.current = initialData.pet_owner_id;
        }
    }, [initialData]);

    const handleSelectValue = (selectedOption) => {
        pet_owner_idRef.current = selectedOption.value
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            name: nameRef.current.value,
            gender: genderRef.current.value,
            species: speciesRef.current.value,
            breed: breedRef.current.value,
            age: ageRef.current.value,
            weight: weightRef.current.value,
            pet_owner_id: pet_owner_idRef.current
        }

        onSubmit(data);
        console.log(data)
    }

    return (
        <>
          <div className='w-10/12 m-auto text-left'>
            <h1 className='text-4xl font-bold mt-10'>
              {initialData ? 'Editar mascota' : 'Registrar mascota'}
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
                      htmlFor='gender'
                      >Genero:</label>
                    <input 
                      type="text" 
                      id='gender'
                      name='gender'
                      className='mt-2 w-full p-3 bg-gray-50'
                      placeholder='Genero'
                      ref={genderRef}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='text-slate-800'
                      htmlFor='species'
                      >Especie:</label>
                    <input 
                      type="text" 
                      id='species'
                      name='species'
                      className='mt-2 w-full p-3 bg-gray-50'
                      placeholder='Especie'
                      ref={speciesRef}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='text-slate-800'
                      htmlFor='breed'
                      >Raza:</label>
                    <input 
                      type="text" 
                      id='breed'
                      name='breed'
                      className='mt-2 w-full p-3 bg-gray-50'
                      placeholder='Raza'
                      ref={breedRef}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='text-slate-800'
                      htmlFor='age'
                      >Edad (años):</label>
                    <input 
                      type="text" 
                      id='age'
                      name='age'
                      className='mt-2 w-full p-3 bg-gray-50'
                      placeholder='Edad (años)'
                      ref={ageRef}
                    />
                  </div>
                  <div className='mb-6'>
                    <label
                      className='text-slate-800'
                      htmlFor='weight'
                    >Peso (kg):</label>
                    <input 
                      type="text" 
                      id='weight'
                      name='weight'
                      className='mt-2 w-full p-3 bg-gray-50'
                      placeholder='Peso (kg)'
                      ref={weightRef}
                    />
                  </div>
                  {initialData ? "" : 
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
                  }
                  <div className='flex justify-end'>
                    <a 
                      href="/pets/list"
                      className='rounded bg-rose-600 hover:bg-rose-800 text-white mt-4 mr-3 p-3 uppercase font-bold cursor-pointer'
                    >
                        Cancelar
                    </a>
                    <input 
                      type="submit" 
                      value={initialData ? 'Guardar cambios' : 'Registrar mascota'}
                      className='rounded bg-cyan-600 hover:bg-cyan-800 text-white mt-4 p-3 uppercase font-bold cursor-pointer'
                    />
                  </div>
            </form>
          </div>
        </div>
        </>
      )
}

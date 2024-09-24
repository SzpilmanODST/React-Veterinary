import React from 'react'

export default function Alert({children}) {
  return (
    <div className='text-center my-2 bg-rose-600 text-white font-bold p-3'>
        {children}
    </div>
  )
}

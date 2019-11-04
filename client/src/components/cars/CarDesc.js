import React from 'react'

const CarDesc = ({ options }) => {
    console.log(options);
    return (
        <div className='w-full flex'>
            {options && options.map(option => (
                <div className='bg-white text-base flex p-2 w-1/2 m-4'>
                    <p className='font-bold w-1/2'>Header Desc</p>
                    <p className='flex-end w-1/2'>{option}</p>
                </div>
            )
            )
            }
        </div>
    )
}

export default CarDesc

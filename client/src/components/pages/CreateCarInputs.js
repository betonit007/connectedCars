import React from 'react'

const CreateCarInputs = ({setCarInfo, carInfo}) => {
    return (
        <>
            <div className='mb-4 w-full'>
                <label className='block text-gray-700 text-sm font-bold mb-2' >Full Description</label>
                <input className='shadow appearance-none border-rounded w-full'
                    type='text'
                    name='fullDesc'
                    value={carInfo.fullDesc}
                    onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                    required
                />
            </div>
            <div className='flex secondRow'>
                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Year</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='number'
                        name='year'
                        value={carInfo.year}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>

                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Make</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='make'
                        value={carInfo.make}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-4 w-full md:w-1/3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Model</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='model'
                        value={carInfo.model}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className='flex thirdRow'>
                <div className='mb-4 w-full md:w-1/3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Transmission</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='transmission'
                        defaultValue={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Color</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='color'
                        value={carInfo.color}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />

                </div>

                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Trim</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='trim'
                        value={carInfo.trim}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className='flex fourthRow'>
                <div className='mb-4 w-full md:w-1/3'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Mileage</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='number'
                        name='mileage'
                        value={carInfo.mileage}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Displacement</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='number'
                        name='displacement'
                        value={carInfo.displacement}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
                <div className='mb-4 w-full md:w-1/3 ml-2'>
                    <label className='block text-gray-700 text-sm font-bold mb-2 text-center' >Body Type</label>
                    <input className='shadow appearance-none border-rounded w-full'
                        type='text'
                        name='bodyType'
                        value={carInfo.bodyType}
                        onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                        required
                    />
                </div>
            </div>
            <div className='mb-4 w-full'>
                <label className='block text-gray-700 text-sm font-bold mb-2' >Secondary Description</label>
                <input className='shadow appearance-none border-rounded w-full'
                    type='text'
                    name='secondDesc'
                    value={carInfo.secondDesc}
                    onChange={e => setCarInfo({ ...carInfo, [e.target.name]: e.target.value })}
                    required
                />
            </div>
        </>
    )
}

export default CreateCarInputs

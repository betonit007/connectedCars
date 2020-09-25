import React from 'react'

const ImageMapper = ({ image, deleteImage = f => f }) => {
    return (
        <>  {image ?
            <div className='relative mr-2 mt-2 rounded'>
                <div className="absolute cursor-pointer right-0 pr-2 text-red-700" onClick={() => deleteImage(image.public_id)}>X</div>
                <img
                    className='rounded'
                    src={image.url}
                    alt={image.public_id}
                    style={{ height: '100px' }}
                    
                />
            </div>
            :
            <p>No images saved</p>
        }
        </>
    )
}

export default ImageMapper

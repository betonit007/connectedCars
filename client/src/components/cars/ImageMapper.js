import React from 'react'

const ImageMapper = ({ image, deleteImage = f => f }) => {
    return (
        <>  {image ?
            <img
                className='m-2 rounded btn'
                src={image.url}
                alt={image.public_id}
                style={{ height: '100px' }}
                onClick={() => deleteImage(image.public_id)}
            />
            :
            <p>No images saved</p>
        }
        </>
    )
}

export default ImageMapper

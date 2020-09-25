import React from 'react'
import Resizer from 'react-image-file-resizer'
import axios from 'axios'
import ImageMapper from './ImageMapper'

const FileUpload = ({ picLoading, setPicLoading, images, setImages, user, singleUpload = false }) => {

    const fileResizeAndUpload = async (event) => { //npm package react-image-file-resizer
        setPicLoading(true)
        let fileInput = false
        if (event.target.files[0]) {
            fileInput = true
        }
        if (fileInput) {
            Resizer.imageFileResizer(
                event.target.files[0],
                1000,
                1000,
                'JPEG',
                100,
                0,
                async uri => {
                    try {
                        const response = await axios.post('/api/cars/uploadimages', { image: uri }, {
                            headers: {
                                authtoken: user.token
                            }
                        })
                        console.log(response.data)
                        if (singleUpload) {
                            //single image upload
                            setImages(response.data)
                        } else {
                            setImages([...images, response.data])
                        }
                    } catch (error) {
                        console.log('Error uploading photo(s)', error)
                    } finally {
                        setPicLoading(false)
                    }

                },
                'base64'
            );
        }
    }

    const deleteImage = async (id) => {

        try {
            setPicLoading(true)
            await axios.post('/api/cars/removeimage', {
                public_id: id
            }, {
                headers: {
                    authtoken: user.token
                }
            })
            if (singleUpload) {
                setImages({ url: '', public_id: '' })

            } else {
                let filteredImages = images.filter(image => image.public_id !== id)
                setImages(filteredImages)
            }

        } catch (error) {
            console.log(error)
        } finally {
            setPicLoading(false)
        }

    }

    return (
        <>
            <div className="row">
                <div className="col-md-8 m-auto flex flex-wrap">
                    {
                        images &&
                        images.map(image =>
                            <ImageMapper
                                key={image.public_id}
                                image={image}
                                deleteImage={deleteImage}
                            />
                        )
                    }
                </div>
            </div>
            <div className="row">
                <div className="col-md-8 m-auto pt-2">
                    <label className='btn text-primary cursor-pointer'>
                        {/* {!picLoading ? "+ Add Image"
                            :
                            <>
                                <span className="spinner-border spinner-border-sm mr-2" role="status" aria-hidden="true"></span>
                                Uploading...
                            </>
                        } */}
                        <div className="relative">
                            {!picLoading ?
                                <div className='absolute'>+ Add Image</div>
                                :
                                <div className="absolute loader ease-linear rounded-full border-2 border-t-2 border-gray-200 h-6 w-6 mb-2 ml-4"></div>}
                        </div>
                        <input
                            disabled={picLoading}
                            hidden
                            accept="image/*"
                            placeholder='Images'
                            type="file"
                            onChange={fileResizeAndUpload}
                        />
                    </label>
                </div>
            </div>
        </>
    )
}

export default FileUpload

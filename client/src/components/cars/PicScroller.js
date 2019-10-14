import React, { useState }from 'react';
import arrow from '../layout/img/rightArrow.png';

const PicScroller = ({ pics, carUnPicked, user, saved, saveVehicle, carInfo:[carInfo] }) => {
    
    const [picPosition, setPicPosition] = useState(0)

    const togglePicUp = () => {
        
        if (pics[picPosition + 1]) {
            setPicPosition(picPosition + 1)
        } else { setPicPosition(0)};
    }

    const togglePicDown = () => {
        if (picPosition !== 0) {
            setPicPosition(picPosition - 1)
        } else if (picPosition === 0) {
            setPicPosition((pics.length - 1));
        }
        else { setPicPosition(0)};
    }

    const renderSavedButton = () => {
        if (!user) {
          return null
        }
        else if (saved.indexOf(carInfo._id) !== -1) {
          return <button className="bg-indigo-300 hover:bg-indigo-700 text-white font-bold p-2 h-12 w-24 mb-12 rounded">Saved</button>
        }
        else return <button className="bg-indigo-300 hover:bg-indigo-700 text-white font-bold p-2 h-12 w-24 mb-12 rounded"onClick={() => saveVehicle(carInfo._id, user._id)} >
                      Save Car
                    </button>
      }


    return (
        <div className='flex w-full' style={{ backgroundImage: `url("${pics[picPosition]}")`, backgroundSize: `contain`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100">
            <img className="rotate180" src={arrow} alt="select right" onClick={()=>togglePicDown()}/>
          </div>
          <div className="w-3/5 text-sm">
            <div onClick={()=>carUnPicked()} className="cursor-pointer h-4 text-center">Close Window</div>
            <div className='h-full flex justify-center items-end'> { renderSavedButton() }</div>
          </div>
          <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100" onClick={()=>togglePicUp()}>
            <img src={arrow} alt="select right"/>
          </div>
        </div>
    )
}

export default PicScroller

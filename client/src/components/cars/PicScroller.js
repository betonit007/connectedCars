import React, { useState }from 'react';
import arrow from '../layout/img/rightArrow.png';

const PicScroller = (pics) => {

    const [picPosition, setPicPosition] = useState(0)

    const togglePicUp = () => {
        console.log('clicked')
        if (pics.pics[picPosition + 1]) {
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


    return (
        <div className='flex w-full' style={{ backgroundImage: `url("${pics.pics[picPosition]}")`, backgroundSize: `contain`, backgroundPosition: 'center', backgroundRepeat: 'no-repeat' }}>
          <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100">
            <img className="rotate180" src={arrow} alt="select right" onClick={()=>togglePicDown()}/>
          </div>
          <div className="w-3/5">

          </div>
          <div className="w-1/5 flex items-end opacity-25 cursor-pointer hover:opacity-100" onClick={()=>togglePicUp()}>
            <img src={arrow} alt="select right"/>
          </div>
        </div>
    )
}

export default PicScroller

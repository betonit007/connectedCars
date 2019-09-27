import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import buyPic from './img/buy.jpg';
import couple from './img/couple.jpg';
import research from './img/research.jpg';
import cleanFront from './img/cleanfront.jpg';

const Choices = () => {


	const [choices, setChoice] = useState({
		choice: Math.floor(Math.random() * 3) + 1
	})

	let { choice } = choices;

	const handleChoice = chosen => {
		setChoice({ choice: chosen })
	}

	const renderBackGroundImage = () => {
		switch (choice) {
			case 1:
				return cleanFront;
			case 2:
				return buyPic;
			case 3:
				return couple;
		}
	}

	return (
		<div className="w-full">
			<div className="customHeight" style={{ backgroundImage: `url("${renderBackGroundImage()}")`, backgroundSize: `cover` }}>
				<div className='w-1/2 text-white m-auto flex justify-around pt-5'>
					<button className={`outlineText  ${choice === 1 && "italic"}`} onClick={() => handleChoice(1)}>Shop</button>
					<button className={`outlineText  ${choice === 2 && "italic"}`} onClick={() => handleChoice(2)}>Finance</button>
					<button className={`outlineText  ${choice === 3 && "italic"}`} onClick={() => handleChoice(3)}>Research</button>
				</div>
				<div className="flex justify-center outlineText mt-10 text-white">
					{choice === 1 && (
						<div className='justify-center'>
							<div className='sm:text-3xl md:text-5xl'>Browse our extensive inventory</div>
							
					          <Link className='text-xl flex justify-center bg-blue-500 w-1/3 m-auto rounded' to='/cars'>Shop Now!</Link>
							
						</div>
					  )
					}
				</div>
			</div>
		</div>

	)
}

export default Choices;

import React, { useState } from 'react';
import buyPic from './img/buy.jpg';
import couple from './img/couple.jpg';
import research from './img/research.jpg';
import cleanFront from './img/cleanfront.jpg';

const Choices = () => {

	const [choices, setChoice] = useState({
		choice: 1,
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
					<button className={choice === 1 ? "italic outlineText" : "outlineText"} onClick={() => handleChoice(1)}>Choice 1</button>
					<button className={choice === 2 ? "italic outlineText" : "outlineText"} onClick={() => handleChoice(2)}>Choice 2</button>
					<button className={choice === 3 ? "italic outlineText" : "outlineText"} onClick={() => handleChoice(3)}>Choice 3</button>
				</div>
			</div>
		</div>

	)
}

export default Choices;

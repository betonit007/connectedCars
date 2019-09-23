import React, { useState } from 'react';
import buyPic from './img/buy.jpg';
import couple from './img/couple.jpg';
import research from './img/research.jpg';
import cleanFront from './img/cleanfront.jpg';

const Choices = () => {

	const [choices, setChoice] = useState({
		choice: 1
	})

	const { choice } = choices;

	const handleChoice = chosen => {
		setChoice({ choice: chosen })
	}

	const renderChoice = () => {
		switch (choice) {
			case 1:
				return (
					<div className="customHeight" style={{ backgroundImage: `url("${cleanFront}")`, backgroundSize: `cover` }}>
						<div className='w-1/2 text-white m-auto flex justify-around pt-5'>
							<button onClick={() => handleChoice(1)}>Choice 1</button>
							<button onClick={() => handleChoice(2)}>Choice 2</button>
							<button onClick={() => handleChoice(3)}>Choice 3</button>
						</div>
					</div>
				)
			case 2:
				return (
					<div className="customHeight" style={{ backgroundImage: `url("${couple}")`, backgroundSize: `cover` }}>
						<div className='w-1/2 m-auto flex justify-around pt-5'>
							<button onClick={() => handleChoice(1)}>Choice 1</button>
							<button onClick={() => handleChoice(2)}>Choice 2</button>
							<button onClick={() => handleChoice(3)}>Choice 3</button>
						</div>
					</div>
				)
			case 3:
				return (
					<div className="customHeight" style={{ backgroundImage: `url("${research}")`, backgroundSize: `cover` }}>
						<div className='w-1/2 m-auto flex justify-around pt-5'>
							<button onClick={() => handleChoice(1)}>Choice 1</button>
							<button onClick={() => handleChoice(2)}>Choice 2</button>
							<button onClick={() => handleChoice(3)}>Choice 3</button>
						</div>
					</div>
				)
		}
	}

	return (
		<div className="w-full">
			{renderChoice()}
		</div>

	)
}

export default Choices;

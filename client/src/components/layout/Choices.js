import React, { useState } from 'react'

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
					<div className="bg-red-600">
						<button onClick={() => handleChoice(1)}>Choice 1</button><button onClick={() => handleChoice(2)}>Choice 2</button><button onClick={() => handleChoice(3)}>Choice 3</button>
					</div>
				)
			case 2:
				return (
					<div className="bg-green-600">
						<button onClick={() => handleChoice(1)}>Choice 1</button><button onClick={() => handleChoice(2)}>Choice 2</button><button onClick={() => handleChoice(3)}>Choice 3</button>
					</div>
				)
			case 3:
				return (
					<div className="bg-blue-600">
						<button onClick={() => handleChoice(1)}>Choice 1</button><button onClick={() => handleChoice(2)}>Choice 2</button><button onClick={() => handleChoice(3)}>Choice 3</button>
					</div>
				)
		}
	}

	return (
		<div className="container m-auto">
			{renderChoice()}
		</div>

	)
}

export default Choices;

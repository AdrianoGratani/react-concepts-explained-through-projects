import React, { useState } from 'react';

export default function RandomColor() {

	const [ selectedColorType, setSelectedColorType ] = useState('hex');
	const [ colorGenerated, setColorGenerated ] = useState('#000000');
	
	function pickRandomArrayPartition(inputArrayLen) {
		const randomArrayPartition = Math.floor(Math.random() * inputArrayLen);
		return randomArrayPartition;
	}

	function handleCreateRandomHexColorIntegers() {
		const hexValuesArray = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F'];
		let hexColor = "#";

		for (let i = 0; i < 6; i++) {
			hexColor = hexColor + hexValuesArray[pickRandomArrayPartition(hexValuesArray.length)];
		}
		setColorGenerated(hexColor);
	}

	function handleCreateRandomRgbColorIntegers() {
		let r = pickRandomArrayPartition(256);
		let g = pickRandomArrayPartition(256);
		let b = pickRandomArrayPartition(256);

		let rgbColor = `rgb(${r}, ${g}, ${b})`;
		setColorGenerated(rgbColor);
	}

	return(
		<div className="container"
		     style={{
		        width: '100vw',
				height: '100vh',
				background: colorGenerated
		     }}
		>			
			<button onClick={ ()=> setSelectedColorType('hex') }>Generate HEX Color</button>
			<button onClick={ ()=> setSelectedColorType('rgb') }>Generate RGB Color</button>
			<button onClick={ ()=> selectedColorType === 'hex'
														 ? handleCreateRandomHexColorIntegers()
														 : handleCreateRandomRgbColorIntegers()
					        }
			>
				Generate Random Color
			</button>
			<div className="info">
				<h1 className="textType">
					COLOR SELECTED: 
					<span className="rgbHex">
						{
							selectedColorType === 'hex'
									              ?  " HEX"
									              :  " RGB"
						}
					</span>
				</h1>
				<h1 className="textCode">
					COLOR GENERATED: {colorGenerated}
				</h1>
			</div>
		</div>
	)
}
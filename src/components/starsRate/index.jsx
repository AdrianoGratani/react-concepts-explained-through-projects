import { useState } from 'react';
import { FaStar } from 'react-icons/fa';
import './styles.css';

// why receiving a props for the number of stars?
// you basically create a new array populated with as many items as the noOfStars received;
// 5 is a fallback value, is some sort of a default value in case you don't receive any data as you expected;

export default function StarsRate({noOfStars = 5}) {

	const [ rating, setRating ] = useState(0);
	const [ hover, setHover ] = useState(0);

	function handleClickRating(currentIndex) {
		setRating(currentIndex);
	}

	function handleMouseEnter(currentIndex) {
		setHover(currentIndex);
	}

	function handleMouseLeave() {
		setHover(rating);
	}

	return (
		<div className="star-rating">
			<h1>Rate App. FROM 0 TO 10!!!</h1>
			<h2>You are currently rating: {hover}</h2>
			<h2>Your rate decision is: {rating}</h2>
			{
				[...Array(noOfStars)].map((_,index) => {
					return <FaStar
							className={
								index <= (hover || rating)
									? 'hovered'
									: 'notHoveredYet'
							}  
							key={index}
							onClick={()=> handleClickRating(index)}
							onMouseEnter={()=> handleMouseEnter(index)}
							onMouseLeave={()=> handleMouseLeave()}
							size={40}
							/>
				}) 
			}
		</div>
	)
}



// import React, { useState } from 'react';
// import data from './data';
// import "./styles.css";


// export default function StarsRate() {

// const [ hoveredItemId, setHoveredItemId ] = useState(-1);

// 	return (
// 		<div className="appContainer">
// 			<h1>CURRENT RATING: {hoveredItemId}</h1>
// 			{
// 				data.map((dataItem) => (
// 					dataItem.id <= hoveredItemId
// 						?
// 						<span
// 							style={{
// 								padding:'20px',
// 								border: 'solid black 5px',
// 								background: 'yellow'
// 							}}
// 							onMouseEnter={ 
// 									()=> setHoveredItemId(dataItem.id)
// 								}
// 						>
// 							{dataItem.id}
// 							{console.log(hoveredItemId)}
// 						</span>
// 						:
// 						<span
// 							style={{
// 								padding:'20px',
// 								border: 'solid black 5px',
// 								background: 'white'
// 							}}
// 							onMouseEnter={ 
// 									()=> setHoveredItemId(dataItem.id)
// 								}
// 						>
// 							{dataItem.id}
// 							{console.log(hoveredItemId)}
// 						</span>
// 					)
// 				)
// 			}
// 		</div>
// 	)
// }

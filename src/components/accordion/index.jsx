// there are two types of accordion: single selection, and multiple selection:
// first, if you select one accordion, it'll be the only one opened, while
// second, if you select a new accordion, it'll NOT close the previous opened ones;

import React, { useState } from 'react';
import data from './data';
import "./style.css";


	export default function Accordion() {

		const [selected, setSelected] = useState(null);
		const [enableMultiSelection, setEnableMultiSelection] = useState(false);
		const [multipleSelectedItems, setMultipleSelectedItems] = useState([]);

		function handleSingleSelection(getCurrentId) {
			// console.log(getCurrentId + ": currentId (handleSingleSelection(dataItem.id))");
			setSelected(getCurrentId === selected
						    ? null
                            : getCurrentId
		    );
		    // console.log(getCurrentId === selected + ": " + getCurrentId + " = " + selected);
		}

		function handleMultipleSelection(currentId) {
			let cpyMultipleSelectedItems = [...multipleSelectedItems];          // usi questa copia dell'array per manipolare il suo contenuto in basea cosa viene cliccato;
			const idIsAlreadyHere = cpyMultipleSelectedItems.indexOf(currentId);

			if(idIsAlreadyHere === -1) {										// you clicked one item while multiple sel enabled. if is NOT already in the array, push it
																				//     (if an items' id is in the array = that answer will be displayed)
																				// if the item is ALREADY in the array, pop it from the array
																				//     (you clicked again over an item currently displayed: you want to close it
																				//      if an id is not present in that array, the component will not display it)																				// if is no
				cpyMultipleSelectedItems.push(currentId);
			}
			else {
				cpyMultipleSelectedItems.splice(idIsAlreadyHere, 1);
				console.log(idIsAlreadyHere)                                    // indexOf() method returns you the array position of the current element, so you can easily .splice() it
			}

			setMultipleSelectedItems(cpyMultipleSelectedItems);					// dopo aver fatto tutto, raiggiorni l'array ORIGINALE dandogli il contenuto di questa ...COPIA
		}
		console.log(selected, multipleSelectedItems);

		// console.log(selected + ": selected useState()");
		return  <div className="wrapper">

					<button
					onClick={()=> setEnableMultiSelection(!enableMultiSelection)}>
						{
							enableMultiSelection === true
								? "click to disable multiple selection"
								: "click to enable multiple selection"
						}	
					</button>

					<div className="accordion">
					{
						data && data.length > 0
							?   data.map(																	  // hai importato da data un array di oggetti. per ogni dataItem oggetto, fai le seguenti cose:
									(dataItem) =>  
										<div className="item">
											<div 
											className="title"
											onClick={
												enableMultiSelection === true
													? ()=> handleMultipleSelection(dataItem.id) 
													: ()=> handleSingleSelection(dataItem.id)
											}> 
											<h3>{dataItem.question}</h3>
											<span>+</span>
											</div>
											{																	// questo js gestisce quando mostrare le answers. valido per single e anche multiple selections
												selected === dataItem.id ||
												multipleSelectedItems.indexOf(dataItem.id) !== -1                  // se l'array contiene il current id, il valore return di .indexOf() non puo' essere -1
													? <div className="content">{dataItem.answer}</div>
													: null
											}
										</div>
							    )
							:   <div>no data found</div>
					}
					</div>
			</div>
	}


// import React, { useState } from "react";
// import dummyData from './data';



// export default function AccordionTwo() {
	
// 	const data = dummyData;
// 	const [ itemSelected, setItemSelected ] = useState(null);

// 	function handleClickId(currentId) {
// 			setItemSelected(
// 				currentId === itemSelected
// 					? null
// 					: currentId
// 			);
// 	}
	
// 	return (
// 		<div className="wrapper">
// 			<div className="accordionContainer">
// 				{
// 					dummyData &&
// 					dummyData.length > 0
// 						? 
// 						data.map( (item) => 
// 							<div className="itemContainer">
// 								<h3 class="question"
// 									onClick={()=> handleClickId(item.id)}>
// 										{item.question}
// 								</h3>
// 								<span>+</span>
// 								{
// 									item.id === itemSelected
// 										?
// 										<div>{item.answer}</div>
// 										:   
// 										null
// 								}
// 							</div>
// 						)
// 						: 
// 						<div>nodata found</div>
// 				}
// 			</div>
// 		</div>

// 	)
// }

//  image slider app:  this app displays one image at the time, and lets you move to next or previous image;

//  I need: API TO FETCH IMAGES FROM A URL
// 			button icons to move to next image or previous image
//			button small on the bottom: one for each image stored

//  use picsum for the api. send the url to the index.js component as props
//  in order to fetch data, use template literals over JSON .fetch() so than you can dynamically change the limits of data fetched
//     [ you'll get the limit as props as well ]

//  on top of everything, you want to check if the url exists, so you'll need a useEffect to do so,
//        also you want to check if the url is there after EVERY refreshing of the page, so put the url in the useEffect dependency array as the only partition;

//  do try and catch within async function to check if data from the api is really there, otherwise you'll dislplay error.message

// SLIDER LOGIC
// once you get the images from data fetching,  store them in a useState array images[]
// for each image in the images[] .map()  an img tag.
//   very important: when declaring the .map() declare a second argument to get the index of each image as well

// create a currentimage useState. this will store a number. by default is 0
//    in the jsx. create a condition based on which you'll display the ONLY	image which has its index EQUAL to the value stored at currentimage
//    by default the app displays the first image at index 0

// create two buttons, to iterate over the images;
//    one button on the right to move to the next image,
//    and another button on the left to move to the previous image.

// add onClick event listener to both of the buttons.
//    if you click on the right, you triggera function: goNextImage()
//    if you click on the left button, you trigger another function: goPreviousImage();

//	goNextImage(): calls setCurrentImage, the function useState to refresh the value stored in the const [currentImage]
//                 add the value adding +1 to the current value of currentImage:        setCurrentImage(currentImage + 1)
//  BUT, if currentimage is actually holding a value equal to images(array).length - 1 (which means the currently displayed image is the last
//       in the fetched api data array), it means you cannot go any further without triggereing some sort of nullPointerException;
//       to avoid that, in this special case you call the setCurrentImage() with value 0 as argument;


import React, { useEffect, useState } from 'react';
import { SlArrowLeft, SlArrowRight, SlMagnifier } from "react-icons/sl"; //https://react-icons.github.io/react-icons/icons/sl/
export default function ImageSlider({url, limit = 5, page = 1}) {
	const [] = useState(0);
	const [ imagesApiData, setImagesApiData] = useState([]);
	const [ errorMessage, setErrorMessage ] = useState(null);
	const [ dataLoadingStateMonitor, setDataLoadingStateMonitor] = useState(false);
	const [ indexCurrentlyDisplayedImage, setIndexCurrentlyDisplayedImage ] = useState(0);

	async function importApiImagesToJsonData(currentUrlApi) {
		if(dataLoadingStateMonitor === false){   setDataLoadingStateMonitor(true); }
		try{    const dataFetchFromApi = await fetch(`${currentUrlApi}?page=${page}&limit=${limit}`);
			const dataJsonFromDataFetched = await dataFetchFromApi.json();
			if (dataJsonFromDataFetched) { setImagesApiData(dataJsonFromDataFetched); }
		}
		catch(err){   setErrorMessage(err.message);  }
		finally {  setDataLoadingStateMonitor(false);  }
	}

	useEffect(()=> {if (url !=='') { setDataLoadingStateMonitor(true); importApiImagesToJsonData(url);}}, [url] )

	function getPreviousImageId(){ setIndexCurrentlyDisplayedImage( indexCurrentlyDisplayedImage === 0 ? imagesApiData.length - 1 : indexCurrentlyDisplayedImage - 1 )}

	function  getNextImageId() { setIndexCurrentlyDisplayedImage( indexCurrentlyDisplayedImage === imagesApiData.length - 1 ? 0 : indexCurrentlyDisplayedImage + 1 )}

	if(dataLoadingStateMonitor) {
		return (
			<div>
				<h1>Currently Loading pictures. Please Wait!</h1>
			</div>
		)
	}

	if(errorMessage !== null) {
		return (
			<div>
				<h1 style={{color: 'red'}}>Error Found: {errorMessage}</h1>
			</div>
		)
	}

	return(
		<div>
			<h1>pictureSlider</h1>
			<div className="buttons-container">
				<div className="button-left">
					<SlArrowLeft 
						onClick={() => getPreviousImageId()}
					/>
				</div>
				<div className="button-right">
					<SlArrowRight 
						onClick={() => getNextImageId()}
					/>
				</div>
				<div className="balls-container">
					<span>
						{
							imagesApiData && imagesApiData.length > 0
							? imagesApiData.map((_, indexImage)=> {
								<div>
									<SlMagnifier key={indexImage}/>
								</div>
							})
							: <h1>icon button not found</h1>
						}
					</span>
				</div>
			</div>
			{
				imagesApiData.map((imageItem, indexCurrentImageItem) => (
					indexCurrentlyDisplayedImage === indexCurrentImageItem
						? 
							<img 
							src={imageItem.download_url}
							alt="no image found"
							key={indexCurrentImageItem}
							/>
						: null
				))
			}
		</div>
	)
}


////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/// topics: slider component, fetching data from API, injecting url and limit data as props, async methods and try/catch blocks for error handling
///	loading state rendering, error message handling, both through useState hooks
///	useEffect for impure function effect handling;


// RECEIVE THE DATA IMAGE AS API CALL FROM URL (FIRST PROPS ARG), AND A LIMIT OF PICTURES (SECOND PROPS ARGS); DESTRUCTURE PROPS AS OBJ
//import dummyData from './data';    // we want to implement api calls from url instead of a static reference such as this;
// calling an API something may go wrong, you must HANDLE impure functions effects using the useEffect hook;
//     check if url content changes or is empty: put it in the array dependency of useEffect;
//     if the current url is NOT empty, call aynchronous method to fetch API data images;
//          BUT you should also cover some error handling, let's say API servers are corrupted etc etc...
//              so inside the asyng method you should put a try catch finally block
//API REFERENCE https://picsum.photos/v2/list?page=2&limit=40000

{/*
import React, { useEffect, useState } from 'react';
import { BsArrowLeftCircleFill, BsArrowRightCircleFill } from 'react-icons/bs';
import "./styles.css";

export default function ImageSlider({url, limit = 5, page = 1}) {


const [ images, setImages ] = useState([]);
const [ currentSlide, setCurrentSlide ] = useState(0);
const [ errMsg, setErrMsg ] = useState(null);                        // se l'err viene risolto, devi resettare errMsg to null;
const [ loadingFetch, setLoadingFetch ] = useState(false);

async function fetchImages(currentUrl) {                             // se il fetch fallisce puo' bloccare l'app, quindi usiamo una async funct con un try catch block

	try {							     // prova a fetchare il data dall'api. mentre questo avviene triggera su true un useSTate loading, servira' per fare rendering dinamico mentre il caricamento avviene;
		setLoadingFetch(true);

//		const apiData = await fetch(url);		// non-dynamic url fetching: this way, is the classic but you cannot parse the props dynamically from the parent;

		const apiData = await fetch(`${url}?page=$(page)&limit=${limit}`);      // the best way to parse props into api urls is using the `` template literals sintax; put the props data within ${} to make sure compiler recognize it as js;

		const dataFetched = await apiData.json();            // prova a convertirlo in .JSON

		if (dataFetched) {			             // SOLO ORA, se tutto e' andato a buon fine, metti il data dall'api nello useState images
			setImages(dataFetched);
			setLoadingFetch(false);			     // ora che hai caricato il data API nello useState dell'app, resetta il loading to false
		}
	}
	catch(e) {						    // se invece il data fetch ha fallito, prendi come argomento l'errore e carica il suo .message in uno useState 
		setErrMsg(e.message);			    // cosi', invece di bloccare l'app, mostrerai in un <div> l'error.message ricevuto mentre tentavi di .fetch() il data dallo url dell'API
		
		setLoadingFetch(false);
	}	
}

	useEffect(()=> {                                  // useEffect: tutte le volte che la pagina si ricaarica, potresti avere degli effects fuori dal tuo controllo: fai data fetch da un url sulla quale non hai controllo. tutte le volte che ricarichi la pagina, per prima cosa controlla url se e' vuota, o non esiste;
		if (url !== '') {
			fetchImages(url);
		}	
	}, [url]);


	function handleClickPreviousImage() {
		setCurrentSlide(
			currentSlide === 0
			             ? images.length - 1
			             : currentSlide - 1
		);
	}

	function handleClickNextImage() {
		setCurrentSlide(
			currentSlide === images.length - 1
				     ? 0
				     : currentSlide + 1
		);
	}
	

	if (loadingFetch) {
		return (
			<div className="loading">Loading data!!! Please wait!</div>
		)
	}
	if (errMsg !== null) {
		return (
			<div className="errorMessage">Error Occurred!  {errMsg}</div>
		)
	}

	return (
		<div className="container">
			<h1 className="text">{`image number: ${currentSlide + 1}
			    There are  currently ${images.length} pictures in the box. 
			    If you click right arrow, you see picture ${ currentSlide === images.length - 1
			    								? 1
			    								: currentSlide + 2 }.
                          Press left arrow to see image ${ currentSlide === 0
                                                          ? images.length
                                                          : currentSlide
		    	                                        }
			    `}
			</h1>
			<BsArrowLeftCircleFill 
			      className="arrow arrow-left"
			      onClick={() => handleClickPreviousImage()}	      
		        />
			{
				images && images.length > 0 
					? images.map((image, imageIndex) => (
                                             <img
                                                className={
							currentSlide === imageIndex
								     ? "current-image"
								     : "current-image hide-current-image"
                                                }
						key={image.id}
						src={image.download_url}
						alt={`author: ${image.author}, picture taken from${image.url}`}
                                             />
					  ))
					: null
			}
			<BsArrowRightCircleFill 
				className="arrow arrow-right" 
				onClick={()=> handleClickNextImage()}
			/>
			<span className="button-container"> 
				{
					images && images.length > 0
						? images.map((_, buttonIndex) => (
						       <button 
						               id={buttonIndex}
						               onClick={()=> setCurrentSlide(buttonIndex)}
						               className={
									buttonIndex === currentSlide
										     ? "circular-button"
										     : "circular-button hide-circular-button"
						               }
						       >
						       </button>
						  ))
						: null
				}
			</span>
		</div>
	)
}
*/}

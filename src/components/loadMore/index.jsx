import React, { useEffect, useState } from 'react';
import "./styles.css";
export default function LoadMore({apiUrl = 'https://dummyjson.com/products', limit = 20}) {           
    const [productsDummyData, setProductsDummyData] = useState([]);
    const [itemLoadedCounter, setItemLoadedCounter] = useState(0);                 
    const [dataIsLoading, setDataIsLoading] = useState(false);
    const [errorDataFetchFailed, setErrorDataFetchFailed] = useState(null);
    const [disableButton, setDisableButton] = useState(false);           
    async function fetchDummyDataFromApi(propsGetApiUrl, apiLimit){   //'https://dummyjson.com/products  ?limit=${}  &skip=${counter?:}'     
        setDataIsLoading(true);
        try {
            const dataFetch = await fetch(`${propsGetApiUrl}?limit=${apiLimit}&skip=${itemLoadedCounter === 0 ? 0 : itemLoadedCounter * apiLimit}`);
            const getJSONFromDataFetch = await dataFetch.json();
            if ( getJSONFromDataFetch && getJSONFromDataFetch.products && getJSONFromDataFetch.products.length > 0 ) {
                 setProductsDummyData((prevData)=> [...prevData, ...getJSONFromDataFetch.products]); }
        }  catch(fetchError) { setErrorDataFetchFailed(fetchError.message);}  finally{ setDataIsLoading(false)}
    }
    useEffect(()=> {if (apiUrl !== '' && limit > 0) { fetchDummyDataFromApi(apiUrl, limit)}}, [ itemLoadedCounter ])
    useEffect(()=> {if(productsDummyData && productsDummyData.length >= 100) { setDisableButton(true)}}, [productsDummyData])
    if (dataIsLoading) { return <div>Loading, please wait</div>}
    if (errorDataFetchFailed !== null) { return <div>{errorDataFetchFailed.message}</div>}
    return( <div className="container">
                <div className="product-container">
                    {productsDummyData && productsDummyData.length ? productsDummyData.map((dummyDataItem) => 
                                <div className="product" key={dummyDataItem.id}>
                                    <img src={dummyDataItem.thumbnail} alt={dummyDataItem.title} />
                                    <p>{dummyDataItem.title}</p>
                                </div>)                                 : <div><h1>Where is the data?</h1></div>}
                </div>
                <div className="button-container">
                    <button disabled={disableButton} onClick={()=> setItemLoadedCounter(itemLoadedCounter + 1)}>Load More Products</button>
                    { disableButton ? <p>You have reached 100 products</p> : null }
                </div>
            </div> )}
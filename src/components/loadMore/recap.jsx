// fetch('https://dummyjson.com/products?limit=10&skip=5&select=key1,key2,key3');
import React, { useState, useEffect } from 'react';
export default function LoadMore({apiUrl, limit}) {
const [d, setD] = useState([]);
const [c, setC] = useState(0);
const [l, setL] = useState(false);
const [e, setE] = useState(null);
async function fetching(url) {  setL(true); 
	try{	const f = await fetch(`${url}?limit=${limit}&skip=${c === 0 ? 0 : c * limit}`);
		const r = await f.json();
		setD(r.products);
		console.log(r.products);}catch(e){setE(e.message)}finally{setL(false)}}
		
useEffect(()=> {apiUrl !== '' ? fetching(apiUrl) : console.log("ERROR in useEffect: url is not working.")},[])
useEffect(()=> {},[c])
	return(	<div className="container">{d&&d.length>0?d.map((i)=>(<div className="image-container" key={i.id}>
			<img src={i.thumbnail} alt="picture"/></div>)):<h1 className="no-data">DATA NOT FOUND</h1>}
			<div className="button-container"><button onClick={()=>setC(c+1)}> load more products </button></div></div>

	)
}

import React, { useRef } from 'react';
import useFetch from '../use-fetch';

export default function ScrollTopBottom() {

    const {data, pending, errorTxt} = useFetch('https://dummyjson.com/products', {});
    const bottomRef = useRef(null);

    function handleScrollTop() {
        window.scrollTo(
            {
                top: 0,
                left: 0,
                behaviour: 'smooth'
            }
        )
    }
    
    
    function handleScrollBottom() {
       bottomRef.current.scrollIntoView({behaviour: 'smooth'})

    }
    
    if(pending) { return <div><h1>please wait while data gets fetched from API.</h1></div>}
    if(errorTxt) { return <div><h1>an error occurred: {errorTxt}</h1></div>}


    return (
        <div>
            <h1>top of the page</h1>
            <button onClick={handleScrollBottom}>Press to scroll to the bottom</button>
            <ul>
                {
                    data && data.products && data.products.length 
                    ? data.products.map((it, i)=> <li key={i}>{it.title}</li>) 
                    : null
                }
            </ul>

            <h1>bottom of the page</h1>
            <button onClick={handleScrollTop}>Press to scroll to top</button>
            <div className="bottom" ref={bottomRef}></div>
        </div>
    )
}


// use the .scrollTo() method of the window object to manipulate the position in the browser page. that's it.
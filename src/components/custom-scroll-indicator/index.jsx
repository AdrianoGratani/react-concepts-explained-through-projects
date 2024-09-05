// un div contiene posto in alto si estende o contrae in base a quanto in fondo sei sceso nella pagina.

import React, { useEffect, useState } from 'react';


export default function ScrollIndicator({url}) {          // import some dummy data, parse as PROPS from the parent;

  const [data, setData] = useState([]);                   // dummy data retrieved will be parsed into JSON and stored in this useState;
  const [loading, setLoading] = useState(false);          // while fetching data from url into JSON, it may take few seconds: update this useState while fetching data, and change the ui accordingly to this state, by implementing some ternary operators;
  const [errorMessage, setErrorMessage] = useState(null)  // if data fetch fails, fetchDAta() catch the error and throws it. you can store the error in here dynamically. if this useState is not full, an event is triggered by a ternary operator in the ui. so a ui element will display the message error;
  const [scrollPercentage, setScrollPercentage] = useState(0);   // starts at 0%


  async function fetchData(propsUrl) {                            // set the loading state; fetch data from url props; create a JSON out of fetch data; store in the useState 'data';
    try{
      setLoading(true);
      const response = await fetch(propsUrl);
      const data = await response.json();
      if (data && data.products && data.products.length > 0) {
        setData(data.products);
        setLoading(false);
      }
    }
    catch(e) {setErrorMessage(e.message);}
  }

  function handleScrollPercentage() {
    console.log(document.body.scrollTop, document.documentElement.scrollTop, document.documentElement.scrollHeight, document.documentElement.clientHeight)
    const howMuchScrolled = document.body.scrollTop  ||  document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    setScrollPercentage((howMuchScrolled / height) * 100);
  }

  useEffect( ()=>{                                        // implement useEffect to call the fetch function based on its dependency array: url changes = call the function again;
    fetchData(url);
  }, [url]);

  useEffect(()=> {          //
    window.addEventListener('scroll', handleScrollPercentage())
    return ()=> window.removeEventListener('scroll', ()=>{})
  }, [])

  return (
    <div>
      <div className="top-container">
        <h1>Custom Scroll Indicator</h1>
        <div className="scroll-progress-tracking-container">
          <div className="current-progress-bar" style={{ width: `${scrollPercentage}%` }}></div>
        </div>
      </div>
      <div className="data-container"> {data && data.length > 0  ? data.map((dataItem) => <p>{dataItem.title}</p>) : null} </div>
    </div>
  );
}
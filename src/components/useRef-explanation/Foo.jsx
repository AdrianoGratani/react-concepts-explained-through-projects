import { useEffect, useRef, useState } from "react";

export default function Foo() {
  const [n, setN] = useState(0);
  const inputRef = useRef(null);
  const inputRef2 = useRef(null);

  useEffect(() => { console.log("COMPONENT RE-RENDERED. [useEffect] ==> " + n); });

  function handleClickColor() {   inputRef.current.focus();   inputRef.current.style.backgroundColor = "red";  }

  function handleClickColorTwo() { inputRef.current.style.backgroundColor = "yellow"; }

  function handleClickNumber() {  setN(n=>n+1);  }

  function handleClickRef2() {  inputRef2.current.style.backgroundColor = 'cyan';  }

  function handleClickResetAll() {
    setN(0);    inputRef.current.style.backgroundColor = 'white';     inputRef2.current.style.backgroundColor = 'white';
  }

  return (
    <div>
      <div>
        <h1>open the console(f12) and Click the first button.</h1>
        <button onClick={handleClickColor}>
          useRef: Click here to change the color. no reRendering triggered.
        </button>
        <input ref={inputRef} />
      </div><br></br>
      <div>
        <h1>then, click the second button.</h1>
        <button onClick={handleClickNumber}>useState here. click to increase the number. re-rendered triggered, useState console logs the number with some text.</button>
        {
            n > 0 ?  <div>
                        <h1>even though rerenders, color stays red: useRef stores data just like useState, but no rerendering is triggered by useRef.</h1>
                        <h4>Render number {n}</h4>
                    </div>
                     
            : null
        }
      </div><br></br>
      <div>
        <h1>Lasty: change again the color of the input with this button:</h1>
        <button onClick={handleClickColorTwo}>useRef: turn the input color to green now: no rerendering occured</button>
        <h4>Render number ------ {n}</h4>
      </div>

      <div>
        <button onClick={handleClickRef2}>Click here to triggerer another Ref const</button>
        <input ref={inputRef2}/>
        <br></br>
        <br></br>
        <br></br>
        <button onClick={handleClickResetAll}>click to reset</button>
      </div>
    </div>
  );
}

// if useEffect has NO dependency array (not even empty), it will perform its code EVERY TIME the component is re-rendered;
// useRef() returns a single object with a single 'current' property. 'current' is initially set to the value you provided;
// the useEffect code is NOT TRIGGERED = the data ref changes and is stored, but component IS NOT rerendering;

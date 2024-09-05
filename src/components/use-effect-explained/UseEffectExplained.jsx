import React, { useEffect, useRef, useState } from "react";

export default function UseEffectExplained() {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const ref1 = useRef();

  function handleAddCount() {
    setCount((n) => n + 1);
  }

  function handleCount2() {
    setCount2((c) => c + 1 - 2);
  }

  useEffect(() => {
    document.title = `Count = ${count}`;
  });

  useEffect(() => {
    ref1.current.style.backgroundColor = count % 2 === 0 ? "red" : "white";
  }, []);

  useEffect(() => {
    handleCount2();
  }, [count]);


  // useState stores width and height: you will display this in the document text. every time the size of the page changes, an eventListener 'resize' is triggered:
  // it calls a function handleResize(), which sets the useState data for width and height with the current data, so at each CHANGE of width and height useeffect is triggered and
  // the data in the <p> changes
  function handleResize() {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return ()=> window.removeEventListener("resize", handleResize);
  }, [window.innerWidth, window.innerHeight]);

  return (
    <div className="container">
      <div className="explanation">
        <div>
          <h1>The useEffect() React hook, explained</h1>
        </div>
        <div>
          <h4>useEffect() triggers code, based on conditionals;</h4>
        </div>
        <div>
          <p>
            useEffect() is a react hook, a hook is just like a function: it
            performs actions, and then outputs something based on the inputs;
          </p>
          <p>
            useEffect() tells React to perform some actions (these actions are
            written INSIDE the useEffect() scope).
          </p>
          <p>
            what really matters is the WHEN. with useEffect() you can
            change/choose when these actions must be performed, based on three
            criteria:
          </p>
          <ul>
            <li>
              re-rendering: useEffect() will perform its actions EVERY TIME the
              components in which is contained, is re-rendering`;
            </li>
            <li>
              on component mounting: mounting is when you load your React app in
              the browser, and a specific component is 'built' in the dom for
              the first time;
            </li>
            <li>
              on specific data change: useEffect() provides you with an array []
              as its SECOND argument: if you store variables inside the array,
              useEffect() will be invoked ONLY when the variable data gets
              refreshed/changes;
            </li>
          </ul>
          <div>
            <h3>Syntax, for each criteria:</h3>
            <ul>
              <li>
                useEffect(( )=&#62; ); // the ( )=&#62; is a callback, and it
                gets triggered to perform the useEffect actions EVERY TIME THE
                COMPONENT RE-RENDERS: because there is NO dependency array as
                second argument which means no limitations to this code;
              </li>
              <li>
                useEffect( ( )=&#62; {}, [ ] ); // the ( )=&#62; is a callback,
                and it gets triggered to perform the useEffect actions ONLY ON
                MOUNT, because the dependency array [ ] is EMPTY;
              </li>
              <li>
                useEffect( ( )=&#62; {}, [ var1, var2 ] ); // the ( )=&#62; is a
                callback, and it gets triggered to perform the useEffect actions
                ONLY WHEN DATA CHANGES... which data? the data stored in the
                variables you attached to useEffect in the depency array as
                second argument[ ];
              </li>
            </ul>
          </div>
          <div>
            <h4>useEffect is mostly used for the following cases:</h4>
            <ul>
              <li>Event listeners, and DOM manipulation</li>
              <li>fetching data from API</li>
              <li>a cleanup when component unmounts</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="code">
        <h1>Some Code Examples</h1>
        <div>
          <h1>1</h1>
          <h3>Count = {count}</h3>
          <button onClick={handleAddCount}>Click to add 1 to Count</button>
          <p>
            this example employs useState for the count, and useEffect with NO
            ARGUMENTS to reset the title of this page = every time the page gets
            rerendered, the title gets refreshed;{" "}
          </p>
        </div>
        <div>
          <h1>2</h1>
          <h3 ref={ref1}>
            Random text: on mount, it becomes red. its useEffect has logic to
            trigger more color changes by ref based on useState(count). but It
            has EMPTY array dependency, so it will only perform actions on
            mounting;
          </h3>
        </div>
        <div>
          <h1>3</h1>
          <p> Count 2: {count2} </p>
          <p>
            {" "}
            this negative counter has no button, is attached to another
            useEffect which triggers this useState counter EVERY time the
            original count changes: [count] is the second argument{" "}
          </p>
          <h3></h3>
        </div>
        <div>
          <h1>4</h1>
          <p>
            this useEffect has an array with innerWidth and innerHeight: those
            variables are stored in a useState: every time they change, this
            text changes: 
            <h4>width = {width};</h4>
            <h4>height = {height};</h4>
          </p>
          <p>
            in order for this to work, a 'resize' eventListener is required,
            inside the useState hook
          </p>
        </div>
      </div>
    </div>
  );
}

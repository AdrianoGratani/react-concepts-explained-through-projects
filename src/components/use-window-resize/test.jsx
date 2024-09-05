import React from 'react';
import useWindowResize from '.';


export default function UseWindowResizeTest() {

    const windowSize = useWindowResize();
    const {width, height} = windowSize;               // object destructuring the data stored in useState in the hook;

    return (
        <div>
            <h1>Testing the useWindowResize hook</h1>
            <p className="width">Width: {width}px</p>
            <p className="height">Height: {height}px</p>                        <br></br><br></br><br></br>
            <h4 className="explanation-text">
                I made a hook useWindowResize, which stores:<br></br>
                    1) useState data of the current width and height of the component attached to, two const named 'width' and 'height'<br></br>
                    2) a handler function which gets the current size from the DOM, and refresh the useState with the new data.<br></br>
                    3) a useLayoutEffect: a useEffect triggered on Change of layout size.<br></br>
                        every time useLayoutEffect gets triggered, 
                            the handler is called, an event listener on 'resize' is created (it triggers the handler)
                            on return, the event listener is removed
            </h4>

        </div>
    );
}
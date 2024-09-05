import { useRef, useState } from 'react';
import useClickOutside from ".";

export default function UseOutsideClickTest() {
    const [isShowingModalContent, setIsShowingModalContent] = useState(0);
    const ref = useRef();
    useClickOutside(ref, ()=> setIsShowingModalContent(false));

    return (
        <div className="app-container">
            {   isShowingModalContent 
                    ? <div ref={ref}><h1>Random text</h1><p>click outside this text to hide it again</p></div>
                    : <button onClick={()=> setIsShowingModalContent(1)} className="modal-btn">Click to see the content</button>
            }
        </div>
    )
}


/// each content in the browser has a reference ( a 'ref')
/// useRef() stores some data, like useState(). it rembers informations such as DOM elements you put into, but it DOES NOT triggere re-rendering.
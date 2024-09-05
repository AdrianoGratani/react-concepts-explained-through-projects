import { useEffect } from 'react';


export default function useClickOutside(reference, handlerFunction) {


    useEffect(()=> {

        function listener (event) {    
            if (!reference.current || reference.current.contains(event.target) ) {  
                    console.log( reference + reference.current + reference.target );
                    return;   
                }
                    
            console.log("reference argument: " + reference + "\nreference.current: " + reference.current + "\nreference.target: " + reference.target );
            console.log(event);
            console.log(event.target);
            console.log(reference.current.contains(event.target));
            handlerFunction(event);  
            return;
        }

        document.addEventListener('mousedown', listener);
        document.addEventListener('touchstart', listener);

        return () => {  document.removeEventListener('mousedown', listener);    document.removeEventListener('touchstart', listener);  }
    } , [reference, handlerFunction])

}


// this hook takes refs of DOM elements.
// useRef is given to <div ref={ref}   so it'll catch the event target reference property based on the events;
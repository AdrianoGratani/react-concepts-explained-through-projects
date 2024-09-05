import { useLayoutEffect, useState } from 'react';


export default function useWindowResize() {

    const [windowSizeData, setWindowSizeData] = useState({width: 0, height: 0});

    function handleWindowSizeData() {
        setWindowSizeData({
            width: window.innerWidth, height: window.innerHeight
        });
    }

    useLayoutEffect(()=> {
        handleWindowSizeData();                                 // so you don't get the default useState 0 and 0;
        window.addEventListener('resize', handleWindowSizeData);
        return () => {  window.removeEventListener('resize', handleWindowSizeData);  }  // it works fine without this btw;
    }, [])

    return windowSizeData;                      // return the object: you easily destructure it in your component and its data is ready to use;

}

// in the useEffect/useLayoutEffect don't forget to unmount the eventListener before leaving the function;
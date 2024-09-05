// import { useEffect, useState } from 'react';

// export default function useFetch(url, options = {}) {
//     const [data, setData] = useState(null);    const [pending, setPending] = useState(false);   const [error, setError]  = useState(null);

//     async function fetchData() {  setPending(true);
//         try{
//             const response = await fetch(url, {...options});       if (!response.ok) {throw new Error(response.status.text);}
//             const jsonFetch = await response.json();               setData(jsonFetch);     setError(null);
//         } catch(e){ setError(`${e.message}`)}                        finally{setPending(false)}
//     }

//     useEffect( ()=> {fetchData(); }, [url])

//     return {data, error, pending};
// }


import { useEffect, useState } from 'react';

export default function useFetch(url, options = {}) {
    const [ data,setData ] = useState(null);    const [ pending,setPending ] = useState(false);    const [ errorTxt,setErrorTxt ] = useState(null);

    async function fetchData() {    setPending(1);
        try{    const responseAPI = await fetch(url, {...options});    if (!responseAPI.ok) {throw new Error(responseAPI.status.text)};
                const fetchedResponseAPI = await responseAPI.json();   setData(fetchedResponseAPI);
        }    catch(e){let err = e.message; setErrorTxt(err)}   finally{setPending(0);}
    }
    useEffect(()=> { fetchData() }, [url])
    return {data, pending, errorTxt};
}
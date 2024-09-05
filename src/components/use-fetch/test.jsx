//  import React from 'react';
// import useFetch from ".";



// export default function UseFetchHookTest() {

//     const {data, error, pending} = useFetch('https://dummyjson.com/products', {});        // come arguments, le due props url e options (questa e' la call a tutti gli effetti);
//     console.log(data, error, pending);

//     return (
//         <div>
//             <h1>Custom Fetch Hook React-App</h1>
//             <div>
//                 { error ? <h3>{error}</h3> : null }
//                 { pending ? <h4>Loading Data from API</h4>: null }
//                 { data && data.products && data.products.length      ? data.products.map((it, i)=> <p key={i}>{it.title}</p>)        : null }
//             </div>
//         </div>
//     )
// }


// when importing CUSTOM hooks, never use curly braces like this:       import {customHookName} from ....


import React from 'react';
import useFetch from ".";

export default function UseFetchHookTest() {
    const {data, pending, errorTxt} = useFetch('https://dummyjson.com/products');

    return (
        <div className="app-container">    <h1 className="app-name">UseFetchHook App</h1>
            {pending ? <h1 className="pending-text">{pending}</h1>    : null}
            {errorTxt ? <h1 className="error-text">{errorTxt}</h1> : null}
            { data && data.products && data.products.length ? data.products.map((it, i)=> <h4 key={i} className="api-item-title">{it.title} </h4>)     : null}
        </div>
    )
}
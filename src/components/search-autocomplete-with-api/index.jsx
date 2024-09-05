import React, { useEffect, useState } from 'react';
import SuggestedUserAutocomplete from "./SuggestedUserAutocomplete";

export default function SearchAutocomplete({apiProps = 'https://dummyjson.com/user?limit=100'}) {
    const [isLoadingApi, setIsLoadingApi] = useState(false);
    const [apiDataUsers, setApiDataUsers]  = useState([]);
    const [errorUI, setErrorUI]  = useState(null);
    const [showDropdownSuggestion, setShowDropdownSuggestion] = useState(false);                            
    const [searchUserParams, setSearchUserParams] = useState('');
    const [filteredUser, setFilteredUser] = useState([]);

    async function fetchDataFromApi(apiURL) {       setIsLoadingApi(true)
        try {   const dataFetched = await fetch(apiURL);        const data = await dataFetched.json();   
                if (data && data.users && data.users.length) { setApiDataUsers(data.users.map((user)=> user.firstName));  setErrorUI(null); console.log('data fetched.'); }  }
        catch(e) {  setErrorUI(e.message);  console.log(e); setIsLoadingApi(false);}
        finally {  setIsLoadingApi(false);  }
    }

    function handleChange(e) {   const query = e.target.value.toLowerCase();    setSearchUserParams(query);
        if (query.length > 1) {  const filteredData = apiDataUsers && apiDataUsers.length    // se hai data API, filtrala in nuovo array in base alla query e mostra il dropdown della lista filtrata, sotto l'input;
                                    ? apiDataUsers.filter((user) => user.toLowerCase().indexOf(query) > -1)   // se index ritorna > 1 e' true. ritorna nel nuovo array solo gli user true e scarta i false;
                                    : [];  // altrimenti filteredData e' un array vuoto;
                                    setFilteredUser(filteredData);  // aggiorna questo useState con l'array filteredData, pieno o vuoto che sia;
                                    setShowDropdownSuggestion(true); // ora mostra il dropdown react component;
        } else { setShowDropdownSuggestion(false); }
    }

    function handleGetUserChoice(e) {  setSearchUserParams(e.target.innerText);     setShowDropdownSuggestion(false);       setFilteredUser([]);  }

    useEffect(()=> {  fetchDataFromApi(apiProps); },[]);                            console.log(apiDataUsers, filteredUser);

    if (isLoadingApi == true) return <div><h1>Currenty loading data from API... please wait!!!</h1></div>
    if (errorUI !== null) return <div><h1>An error occurred while fetching data from API... sorry!!! {errorUI}</h1></div>
    return (
        <div className="autocomplete-container">
                <h1 className="title">Autocomplete App from api user names</h1>
                <input type="text" value={searchUserParams} onChange={(e)=> handleChange(e)}  placeholder="Search user here..."/>
                { showDropdownSuggestion && <SuggestedUserAutocomplete filterDataUser={filteredUser} handleGetUserChoice={handleGetUserChoice}/> }  {/* se lo useState e' stato messo in true da handlChange(), allora ci sono le condizioni per mostrare la lista che contiene le suggestioni di autocomplete; */}
            </div>
        )
}



// spiegazione:  > 1 significa che ti ritorna l'index di user based sulla query = l'ha trovato. filtra la ricerca in un nuovo array. questo array contiene solo gli user che corrispondono alla tua query; infine mette tale filter array dell'originale, in un altro useState 'filteredUsers'    // l'input tramite handleChange() di onChange carica la const query con i caratteri (trasformati in lowerCase()). ogni carattere che passa dentro query viene mandato in searchUserParams.  se l'utente ha digitato almeno 2 caratteri, prima si controlla che l'app contenga il data fetch da api, monitorando apiDataUser []. se esso non e' vuoto significa che ci sono dei nomi. a questo punto, filtri l'array con tutti i nomi da api in base alla query che ricevi dall'utente, per far cio' usi il method .filter() che filtrera' tutti i nomi in tale array che corrispondono alla query, usando su ogni user il method .indexOf():      apiUsers.filter((user) => user.indexOf(query) > 1) 
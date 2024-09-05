import "../styles.css";


export default function Search({search, setSearch, handleAPI}) {




  

    return (

        <div className="search-engine">
            <input 
                type="text"
                placeholder="City:"
                value={search}
                name="search"
                className="city-search"
                onChange={(event)=> setSearch(event.target.value)}
            />
            <button className="search-btn" onClick={handleAPI}>Search</button>
        </div>
    )
}
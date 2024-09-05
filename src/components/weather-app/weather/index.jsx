import { useEffect, useState } from 'react';
import Search from "../search/index";
import "../styles.css";

export default function WeatherApp() {

    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(false);
    const [weatherData, setWeatherData] = useState(null);


    async function fetchAPI(param) {
        setLoading(true)
        try {
            const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${param}&appid=4ec51e61c4fd7d4362e194d1b1f15e3a`);
            const data = await res.json();
            if (data){
                setWeatherData(data)
                setLoading(false);
                console.log(data);
            }
        }

        catch(e) {
            console.log(e);
        }
    }

    function handleAPI() {
        fetchAPI(search);
    }

    useEffect(()=> {fetchAPI('Seoul')}, [])


    if(loading) {return <div>Loading...</div>}


    return (
        <div className="app-container">
            <h1>Weather App</h1>
            <Search search={search} setSearch={setSearch} handleAPI={handleAPI}/>
            <div>
                {
                    weatherData ? 
                    <div>
                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <h3>{weatherData.main.temp} fahrenheit</h3>
                    </div>
                    : null
                }
            </div>
        </div>
    )
}
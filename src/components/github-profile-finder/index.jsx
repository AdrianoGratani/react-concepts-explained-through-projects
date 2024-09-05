import React, { useEffect, useState } from 'react';
import User from "./card.jsx";
import "./styles.css";

export default function GitHubProfileFinder() {
    const [userName, setUserName] = useState("Adriano");
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(false);

    async function fetchGithubUserData() { 
        setLoading(true);
        const response = await fetch(`http://api.github.com/users/${userName}`); const data = await response.json(); 
        if (data) { setUserData(data); setLoading(false); setUserName('')};                        console.log(data);
        }
    function handleSubmit() { fetchGithubUserData(); }
    useEffect(()=> {fetchGithubUserData()} ,[]);

    if (loading) {   return (  <div>Loading... Please wait!</div>  );   }
    return (
        <div className="github-profile-container">
            <div className="input-wrapper">
                <input  type="text"  value={userName}  onChange={ (e) => setUserName(e.target.value) } name="search-by-username"  placeholder="Search Github User..."  />
                <button onSubmit={handleSubmit}>Search</button>
            </div>
            {   userData !== null ? <User user={userData}  /> : null    }
        </div>
    );
}
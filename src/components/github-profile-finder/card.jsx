import React from 'react';

export default function User({ user }) {

    const {name, login, public_repos, avatar_url, followers, following, created_at} = user;                       // object ({user}) destructuring;
    const createdDate = new Date(created_at);
    return (
        <div className="user">
            <div>  <img src={avatar_url} className="avatar" alt="User profile picture"/>  </div>
            <div>  <a href={`http://github.com/${login}`}></a>{name || login}</div>
            <p>User joined on: {`  ${createdDate.getDate()} ${ createdDate.toLocaleString('en-us', {month : 'short'}) } ${ createdDate.getFullYear() }  `}</p>
            <div><p></p><p>{}</p></div>

            <div><p>Created Repos: {public_repos}</p></div>
            <div><p>Followers: {followers}</p></div>
            <div><p>Following: {following}</p></div>    
        </div>


    )
}



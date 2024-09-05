 import React from 'react';

export default function SuggestedUserAutocomplete({filterDataUser, handleGetUserChoice}) {
    return <ul>{ filterDataUser && filterDataUser.length > 0 
        ? filterDataUser.map((filterDataUser, index) => <li key={index} onClick={handleGetUserChoice}>{filterDataUser}</li>) 
        : <p>no suggestion</p> } </ul>
}
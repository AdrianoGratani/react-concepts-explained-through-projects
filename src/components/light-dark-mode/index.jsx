import React from 'react';
import "./theme.css";
import useLocalStorage from './useLocalStorage';


export default function LightDarkMode() {
	const [theme, setTheme] = useLocalStorage('theme', "dark");               				// the custom hook to set the theme; default value is 'dark' on toggle becomes 'light'
	function handleToggleTheme(){ setTheme(theme === 'light' ? 'dark' : 'light') }
	
	return (
		<div className="light-dark-mode" data-theme={theme}>
			<div className="container">
				<h1>Light Dark Mode Toggle</h1>
				<button onClick={()=> handleToggleTheme()}>Click here to Change Mode</button>
			</div>
		</div>
	)
}


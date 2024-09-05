import { useEffect, useState } from 'react';


export default function useLocalStorage(key, defaultValue) {                 // "theme", "dark"      by default is set to dark 

	const [value, setValue] = useState(()=> { let currentValue;                                   // 1.extract theme data from localStorage;
		try { currentValue = JSON.parse(localStorage.getItem(key)) || String(defaultValue); }
		catch(e) { currentValue = defaultValue; } 
		finally { return currentValue; }
	  }
	)

	// 2. save it; you want to set current value BASED on key or value, so store those in the dependency array;   if this changes, set again the value
	useEffect(()=> { localStorage.setItem(key, JSON.stringify(value)); }, [key, value]);

	return [value, setValue];
}

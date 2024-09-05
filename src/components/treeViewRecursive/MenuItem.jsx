// call the list FROM the item (recursion), ONLY IF the item has children
import React, {useState} from "react";
import MenuList from "./MenuList";


export default function MenuItem({ item }){

	const [displayChildren, setDisplayChildren] = useState({});

	function handleToggleChildren(currChild) {
		setDisplayChildren({
			...displayChildren,
			[currChild]: !displayChildren[currChild]
		});

		console.log(displayChildren);
	}

	return (
		<div className="menu-item">
			<div>
				<p>{item.label}</p>
				{
					item && item.children && item.children.length > 0
					? <span onClick={()=> handleToggleChildren(item.label)}>
                                               {
							!displayChildren[item.label]
						       		? "+"
						       		: "-"
					       }
					  </span>
					: null
				}
			</div>
			{
				item && item.children && item.children.length > 0 && displayChildren[item.label]	
					? <MenuList list={item.children} />  
					: <p>no children</p>
			}
		</div>
	)
}

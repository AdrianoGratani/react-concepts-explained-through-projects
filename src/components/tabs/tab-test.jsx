// the parent component.
import Tabs from "./tabs";

function RandomComponent() {    return <div>this a random component.</div>   }

export default function TabTest() {

    const tabs=[{label: "tab 1", content: <div>this the content for tab...1</div>},  {label: "tab 2", content: <div>this the content for tab...2</div>},  {label: "tab 3", content: <RandomComponent />},  ]

    function handleChange(currTabIndex) {
        console.log(currTabIndex);
    }

    return (    <Tabs tabsContent={tabs} onChange={handleChange}   />  )
}
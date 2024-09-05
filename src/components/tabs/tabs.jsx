// you need useState to get the current index of the tab you want to visit;
// {/* map the PROPS content here: if the current tab at the current exists, and it has some content, then display it */}
// onchange is a function sent as props: just to output the current index of the clicked item in the console as console.log;


import React, { useState } from "react";

export default function Tabs({ tabsContent, onChange }) {                         
  const [index, setIndex] = useState(0); // the current tab index;

  function handleClick(index) {
    setIndex(index);
    onChange(index);
  }

  return (
    <div className="wrapper">
      <div className="heading">
        {tabsContent.map((item, i) => (
          <div key={item.label} onClick={() => handleClick(i)}>
            <span className="label">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="content" style={{ color: 'red' }}>
        {tabsContent[index] && tabsContent[index].content}
      </div>
    </div>
  );
}

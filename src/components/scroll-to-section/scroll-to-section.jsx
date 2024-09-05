import { useRef, useState } from 'react';


export default function ScrollToSection() {
    const [section, setSection] = useState(0);
    const itemRef = useRef();

    const data = [
        {
            label: "Card 1",
            style: {
                width: '100%',
                height: '600px',
                background: 'red'
            }
        },
        {
            label: "Card 2",
            style: {
                width: '100%',
                height: '600px',
                background: 'cyan'
            }
        },
        {
            label: "Card 3",
            style: {
                width: '100%',
                height: '600px',
                background: 'yellow'
            }
        },
        {
            label: "Card 4",
            style: {
                width: '100%',
                height: '600px',
                background: 'green'
            }
        },
        {
            label: "Card 5",
            style: {
                width: '100%',
                height: '600px',
                background: 'blue'
            }
        },
    ]

    function handleSection(event) {
        setSection(event.target.value);
    }

    function handleScrollToSection() {
        if (section === 0) return;
        let pos = itemRef.current.getBoundingClientRect().top;

        window.scrollTo({
            top: pos,
            behavior: 'smooth'
        })
    }

    return (
        <div>
            <h1>Scroll Content App</h1>
            <input type="number" placeholder="which section (number)" value={section > 0 && section < 6 ? section : section} onChange={(e)=> handleSection(e)} />
            <button onClick={handleScrollToSection}>Click here to scroll</button>
            <div>
                {
                    data.map((item, i)=> 
                    <div ref={i===section - 1 ? itemRef : null} key={i} style={item.style}>
                        <h4>{item.label}</h4>
                    </div>
                    )
                }
            </div>
        </div>
    )
}
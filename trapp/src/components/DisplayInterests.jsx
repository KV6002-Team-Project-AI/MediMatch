import * as React from 'react';

function DisplayInterests(props) {  

    const interest_1 = props.interest_1;
    const interest_2 = props.interest_2;
    const interest_3 = props.interest_3;
    const interest_4 = props.interest_4;

    const listValues = [
        interest_1,
        interest_2,
        interest_3,
        interest_4
    ]

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const lightColors = [
        'teal', 
        'cyan',
        'emerald',
        'green', 
    ]

    // Function to get a random color from coolColors
    const getRandomColorClass = () => {
        const randomIndex = Math.floor(Math.random() * lightColors.length);
        return lightColors[randomIndex];
    };

    return (
        <>
            {listValues.map((item, idx) => (
                // Check if item is not empty before rendering the div
                item && (
                    <div key={idx} className={`bg-${getRandomColorClass()}-100 text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg`}>
                        {capitalizeFirstLetter(item)}
                    </div>
                )
            ))}
        </>
    )
}

export default DisplayInterests;

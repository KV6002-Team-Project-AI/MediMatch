import * as React from 'react';

/**
 * Component for displaying a list of interests with randomly generated background colors.
 * 
 * @author Syed Wajahat Quadri <w21043564>
 * @param {Object} props - Props containing interests to display.
 * @param {string} props.interest_1 - First interest.
 * @param {string} props.interest_2 - Second interest.
 * @param {string} props.interest_3 - Third interest.
 * @param {string} props.interest_4 - Fourth interest.
 * @returns {JSX.Element} - JSX for rendering the interests with styled divs.
 */
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

    /**
     * Capitalizes the first letter of a string.
     * 
     * @param {string} string - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const lightColors = [
        'teal', 
        'cyan',
        'emerald',
        'green', 
    ]

    /**
     * Gets a random color class from the lightColors array.
     * 
     * @returns {string} - The random color class.
     */
    const getRandomColorClass = () => {
        const randomIndex = Math.floor(Math.random() * lightColors.length);
        return lightColors[randomIndex];
    };

    return (
        <>
            {listValues.map((item, idx) => (
                // Check if item is not empty before rendering the div
                item && (
                    <div key={idx} className={`bg-cyan-100 text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg`}>
                        {capitalizeFirstLetter(item)}
                    </div>
                )
            ))}
        </>
    )
}

export default DisplayInterests;

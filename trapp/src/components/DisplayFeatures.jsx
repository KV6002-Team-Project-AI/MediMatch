import * as React from 'react';

function DisplayFeatures(props) {  

    const mapDictionary = (dictionary) => {
        if (!dictionary || dictionary.length === 0) {
            return;
        } else {
            return dictionary.map(item => item.name);
        }
    };

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    const sex = props.sex;
    const hair = props.hair;
    const profession = props.profession;
    const ethnicity = props.ethnicity;
    const nationality = props.nationality;
    const pregnancy = props.pregnancy;
    const language = props.language;
    const activity = props.activity;
    const socioeconomic = props.socioeconomic + " Class";
    const health = props.health + " Health";

    const medical_history = mapDictionary(props.medical_history);
    const medication_history = mapDictionary(props.medication_history);
    const current_medication = mapDictionary(props.current_medication);
    const family_medication_history = mapDictionary(props.family_medication_history);
    const allergies = mapDictionary(props.allergies);
    const lifestyle = mapDictionary(props.lifestyle);

    const listValues = [
        sex,
        hair,
        profession,
        ethnicity,
        nationality,
        pregnancy,
        language,
        activity,
        socioeconomic,
        health,

        medical_history,
        medication_history,
        current_medication,
        family_medication_history,
        allergies,
        lifestyle
    ]

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

export default DisplayFeatures;

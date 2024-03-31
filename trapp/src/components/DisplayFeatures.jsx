import * as React from 'react';

/**
 * Component for displaying a list of features with randomly generated background colors.
 * 
 * @author Syed Wajahat Quadri <w21043564>
 * @param {Object} props - Props containing features to display.
 * @param {string} props.sex - Gender feature.
 * @param {string} props.hair - Hair feature.
 * @param {string} props.profession - Profession feature.
 * @param {string} props.ethnicity - Ethnicity feature.
 * @param {string} props.nationality - Nationality feature.
 * @param {string} props.pregnancy - Pregnancy feature.
 * @param {string} props.language - Language feature.
 * @param {string} props.activity - Activity feature.
 * @param {string} props.socioeconomic - Socioeconomic status feature.
 * @param {string} props.health - Health status feature.
 * @param {Array} props.medical_history - Medical history feature.
 * @param {Array} props.medication_history - Medication history feature.
 * @param {Array} props.current_medication - Current medication feature.
 * @param {Array} props.family_medication_history - Family medication history feature.
 * @param {Array} props.allergies - Allergies feature.
 * @param {Array} props.lifestyle - Lifestyle feature.
 * @returns {JSX.Element} - JSX for rendering the features with styled divs.
 */
function DisplayFeatures(props) {  

    /**
     * Maps a dictionary to extract names.
     * 
     * @param {Array} dictionary - The dictionary to map.
     * @returns {Array|string} - The list of names or "none" if dictionary is empty.
     */
    const mapDictionary = (dictionary) => {
        if (!dictionary || dictionary.length === 0) {
            return;
        } else {
            return dictionary.map(item => item.name);
        }
    };

    /**
     * Capitalizes the first letter of a string.
     * 
     * @param {string} string - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
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
                    <div key={idx} className={`bg-purple-100 text-black p-2 rounded-lg shadow transition duration-300 ease-in-out transform hover:-translate-y-1 hover:shadow-lg`}>
                        {capitalizeFirstLetter(item)}
                    </div>
                )
            ))}
        </>
    )
}

export default DisplayFeatures;

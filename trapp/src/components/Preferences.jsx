import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

/**
 * Component responsible for displaying user preferences.
 * It receives various preference categories as props and renders them in a list format.
 * Each preference category is displayed with its corresponding items.
 * 
 * @author Syed Wajahat Quadri <w21043564>
 * @param {Object} props - Props containing preference data for different categories.
 * @param {Array} props.sex - Array of sex preferences.
 * @param {Array} props.hair - Array of hair preferences.
 * @param {Array} props.profession - Array of profession preferences.
 * @param {Array} props.ethnicity - Array of ethnicity preferences.
 * @param {Array} props.nationality - Array of nationality preferences.
 * @param {Array} props.pregnancy - Array of pregnancy preferences.
 * @param {Array} props.language - Array of language preferences.
 * @param {Array} props.activity - Array of activity preferences.
 * @param {Array} props.socioeconomic - Array of socioeconomic preferences.
 * @param {Array} props.lifehealthstyle - Array of health preferences.
 * @param {Array} props.medical_history - Array of medical history preferences.
 * @param {Array} props.medication_history - Array of medication history preferences.
 * @param {Array} props.current_medication - Array of current medication preferences.
 * @param {Array} props.family_medication_history - Array of family medication history preferences.
 * @param {Array} props.allergies - Array of allergy preferences.
 * @param {Array} props.lifestyle - Array of lifestyle preferences.
 * @returns {JSX.Element} - JSX for rendering the preferences list.
 */
function Preferences(props) {   

    /**
     * Maps a dictionary array to an array of names.
     * Returns ['none'] if the dictionary is empty or null.
     * 
     * @param {Array} dictionary - Array of objects with a 'name' property.
     * @returns {Array} - Array of names extracted from the dictionary.
     */
    const mapDictionary = (dictionary) => {
        if (!dictionary || dictionary.length === 0) {
            return ['none'];
        } else {
            return dictionary.map(item => item.name);
        }
    };

    // Extract preference arrays from props and map them to names
    const sex = mapDictionary(props.sex);
    const hair = mapDictionary(props.hair);
    const profession = mapDictionary(props.profession);
    const ethnicity = mapDictionary(props.ethnicity);
    const nationality = mapDictionary(props.nationality);
    const pregnancy = mapDictionary(props.pregnancy);
    const language = mapDictionary(props.language);
    const activity = mapDictionary(props.activity);
    const socioeconomic = mapDictionary(props.socioeconomic);
    const health = mapDictionary(props.lifehealthstyle);
    const medical_history = mapDictionary(props.medical_history);
    const medication_history = mapDictionary(props.medication_history);
    const current_medication = mapDictionary(props.current_medication);
    const family_medication_history = mapDictionary(props.family_medication_history);
    const allergies = mapDictionary(props.allergies);
    const lifestyle = mapDictionary(props.lifestyle);

    // Array of preference categories
    const listItems = [
        "Sex",
        "Hair",
        "Profession",
        "Ethnicity",
        "Nationality",
        "Pregnancy",
        "Language",
        "Activity",
        "Socioeconomic",
        "Health",
        "Medical History",
        "Medication History",
        "Current Medication",
        "Family Medication History",
        "Allergies",
        "Lifestyle"
    ];

    // Array of preference arrays
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
    ];

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 500,
                    '& ul': { 
                        padding: 0,
                        marginY: 0,
                        
                    },
                }}
                subheader={<li />}
            >
                {/* Loop through preference categories and render list items */}
                {listItems.map((sectionId, index) => (
                    <li key={`section-${index}`}>
                        <ul>
                            {/* Render list subheader with category name */}
                            <ListSubheader sx={{ 
                                backgroundColor: '#9c9c9c',
                                marginY: 0,
                            }}>
                                <p className='font-semibold text-base text-stone-50'>{sectionId}</p>
                            </ListSubheader>
                            {/* Loop through preference items and render list items */}
                            {listValues[index].map((item, idx) => (
                                <ListItem key={`item-${sectionId}-${idx}`}>
                                    <ListItemText 
                                        primary= {item}
                                        sx={{fontSize: '0.5rem'}} 
                                    />
                                </ListItem>
                            ))}
                        </ul>
                    </li>
                ))}
            </List>
        </>
    )
}

export default Preferences;

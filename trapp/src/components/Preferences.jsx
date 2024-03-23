import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';

function Preferences(props) {
    const mapDictionary = (dictionary) => {
        if (!dictionary || dictionary.length === 0) {
            return ['none'];
        } else {
            return dictionary.map(item => item.name);
        }
    };

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
    ]

    return (
        <>
            <List
                sx={{
                    width: '100%',
                    maxWidth: '100%',
                    bgcolor: 'background.paper',
                    position: 'relative',
                    overflow: 'auto',
                    maxHeight: 200,
                    '& ul': { 
                        padding: 0,
                        marginY: 0,
                        
                    },
                }}
                subheader={<li />}
            >
                {listItems.map((sectionId, index) => (
                    <li key={`section-${index}`}>
                        <ul>
                            <ListSubheader sx={{ 
                                backgroundColor: '#9c9c9c',
                                marginY: 0,
                            }}>
                                <p className='font-semibold text-base text-stone-50'>{sectionId}</p>
                            </ListSubheader>
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

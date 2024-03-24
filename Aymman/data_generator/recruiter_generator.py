import pandas as pd
import random
import csv


random.seed(42)

def random_choice_with_multiple_options(options, include_any=True, max_choices=None):
   
    if include_any and "Any" in options and random.choice([True, False]):
        return "Any"
    else:
     
        options = [option for option in options if option != "Any"]
        max_choices = max_choices or len(options)
        num_choices = random.randint(1, max_choices)
        return ", ".join(random.sample(options, num_choices))

def random_name():
    first_names = ["Alex", "Jordan", "Taylor", "Casey", "Riley", "Jamie", "Morgan", "Charlie", "Dakota", "Quinn","Aiden", "Avery", "Bailey", "Blake", "Cameron", "Carson", "Carter", "Chase", "Chris", "Christian",
    "Cody", "Cole", "Colin", "Connor", "Cooper", "Corbin", "Corey", "Dylan", "Eli", "Elijah",
    "Elliot", "Ethan", "Evan", "Finn", "Gavin", "Grayson", "Hayden", "Hunter", "Ian", "Isaac",
    "Jace", "Jack", "Jackson", "Jacob", "Jaden", "Jake", "James", "Jasper", "Jayden", "Jesse",
    "John", "Jonah", "Jordan", "Joseph", "Joshua", "Julian", "Kai", "Kaiden", "Kayden", "Keegan",
    "Keith", "Kelly", "Kelsey", "Ken", "Kendall", "Kevin", "Kyle", "Landon", "Leo", "Liam",
    "Logan", "Lucas", "Luke", "Mason", "Matteo", "Max", "Michael", "Miles", "Nathan", "Nico",
    "Noah", "Nolan", "Oliver", "Owen", "Parker", "Patrick", "Peter", "Quentin", "Reid", "Robert",
    "Ryan", "Sam", "Samuel", "Sawyer", "Sean", "Sebastian", "Seth", "Shane", "Shawn", "Sidney",
    "Spencer", "Tanner", "Thomas", "Travis", "Trevor", "Tristan", "Troy", "Tyler", "Victor", "Wyatt"]
    last_names = ["Smith", "Johnson", "Williams", "Jones", "Brown", "Davis", "Miller", "Wilson", "Moore", "Taylor","Anderson", "Thomas", "Jackson", "White", "Harris", "Martin", "Thompson", "Garcia", "Martinez", "Robinson",
    "Clark", "Rodriguez", "Lewis", "Lee", "Walker", "Hall", "Allen", "Young", "Hernandez", "King",
    "Wright", "Lopez", "Hill", "Scott", "Green", "Adams", "Baker", "Gonzalez", "Nelson", "Carter",
    "Mitchell", "Perez", "Roberts", "Turner", "Phillips", "Campbell", "Parker", "Evans", "Edwards", "Collins",
    "Stewart", "Sanchez", "Morris", "Rogers", "Reed", "Cook", "Morgan", "Bell", "Murphy", "Bailey",
    "Rivera", "Cooper", "Richardson", "Cox", "Howard", "Ward", "Torres", "Peterson", "Gray", "Ramirez",
    "James", "Watson", "Brooks", "Kelly", "Sanders", "Price", "Bennett", "Wood", "Barnes", "Ross",
    "Henderson", "Coleman", "Jenkins", "Perry", "Powell", "Long", "Patterson", "Hughes", "Flores", "Washington",
    "Butler", "Simmons", "Foster", "Gonzales", "Bryant", "Alexander", "Russell", "Griffin", "Diaz", "Hayes"]
    return random.choice(first_names) + " " + random.choice(last_names)
    pass

def random_age():
    return random.randint(18, 65)
    pass

def random_height():
    return random.randint(140, 210)
    pass

def random_weight():
    return random.randint(40, 130)
    pass

def random_gender():
    return random.choice(["Male", "Female","Any"])
    pass

def random_hair_colour():
    colours = ["Black", "Brown", "Blonde", "Red", "Grey", "White","Any"]
    return random_choice_with_multiple_options(colours, include_any=True, max_choices=3)

def updated_random_skincolours():
    colours = ["Light", "Medium", "Olive", "Tan", "Brown", "Dark","Any"]
    return random_choice_with_multiple_options(colours, include_any=True, max_choices=3)

def random_profession():
    professions = ["Teacher", "Engineer", "Doctor", "Artist", "Nurse", "Developer", "Chef", "Musician", "Writer", "Scientist","Any"]
    return random_choice_with_multiple_options(professions, include_any=True, max_choices=2)

def random_allergies():
    allergies = ["Foods", "Animals", "Pollen", "Mold", "Dust Mites", "Medications", "Latex", "Insect Stings", "Perfumes/Household Chemicals"]
    if random.choice([True, False]):
        return "No allergies"
    else:
        return random_choice_with_multiple_options(allergies, include_any=False, max_choices=3)

def random_commitment():
    return random.choice(["Short Term", "Long Term", "Any"])
    pass

def random_work_preference():
    return random.choice(["Team", "Solo", "Any"])
    pass

def random_company_name():
    first_words = ["Global", "Dynamic", "Innovative", "Creative", "Advanced", "Tech", "Digital", "NextGen", "Elite", "Future", "Strategic", "Alpha", "Omega", "Pioneer", "Eagle", "Summit", "Apex", "Prime", "Infinity", "Zenith"]
    second_words = ["Solutions", "Technologies", "Systems", "Services", "Enterprises", "Corp", "Consulting", "Group", "Partners", "Labs", "Ventures", "Networks", "Innovations", "World", "International", "Digital", "Industries", "Global", "Tech", "Creators"]
    return random.choice(first_words) + " " + random.choice(second_words)
    
def random_company_location():
    return random.choice(["New York", "Los Angeles", "Chicago", "Houston", "Phoenix", "Philadelphia", "San Antonio", "San Diego", "Dallas", "San Jose", "Austin", "Jacksonville", "San Francisco", "Indianapolis", "Columbus", "Fort Worth", "Charlotte", "Seattle", "Denver", "Washington"])

def generate_recruiter_id():
    generate_recruiter_id.counter += 1
    return generate_recruiter_id.counter

generate_recruiter_id.counter = 0 

def generate_company_id():
    generate_company_id.counter += 1
    return generate_company_id.counter

generate_company_id.counter = 0 



def remove_duplicate_names(df):
    return df.drop_duplicates(subset=['Recruiter_Name'], keep=False)
    
# "username(email)"
# "password"
volunteers = pd.DataFrame([{
    "Recruiter_ID": generate_recruiter_id(),
    "Recruiter_Name": random_name(),
    "Company_ID": generate_company_id(),
    "company_Name":random_company_name(),
    "company_Location":random_company_location(),
    "Age": random_age(),
    "Height": random_height(),
    "Weight": random_weight(),
    "Gender": random_gender(),
    "Hair_Colour": random_hair_colour(),
    "Skin_Colour": updated_random_skincolours(),
    "Profession": random_profession(),
    "Allergies": random_allergies(),
    "Commitment": random_commitment(),
    "Work_Preference": random_work_preference(),
    
} for _ in range(50)])

volunteers_unique = remove_duplicate_names(volunteers)
file_path = 'study_and_recruiter_data.csv'
volunteers_unique.to_csv(file_path, index=False)
print(f"Saved to {file_path}")

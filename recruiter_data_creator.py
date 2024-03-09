import pandas as pd
import random
import csv

random.seed(42)

def random_choice_with_multiple_options(options, include_any=True, max_choices=None):

    if include_any and random.choice([True, False]):
        return "Any"
    else:
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
    colours = ["Black", "Brown", "Blonde", "Red", "Grey", "White"]
    return random_choice_with_multiple_options(colours, include_any=True, max_choices=3)

def updated_random_skincolours():
    colours = ["Light", "Medium", "Olive", "Tan", "Brown", "Dark"]
    return random_choice_with_multiple_options(colours, include_any=True, max_choices=3)

def random_profession():
    professions = ["Teacher", "Engineer", "Doctor", "Artist", "Nurse", "Developer", "Chef", "Musician", "Writer", "Scientist"]
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

def remove_duplicate_names(df):
    return df.drop_duplicates(subset=['Name'], keep=False)
    pass

volunteers = pd.DataFrame([{
    "Name": random_name(),
    "Age": random_age(),
    "Height": random_height(),
    "Weight": random_weight(),
    "Gender": random_gender(),
    "Hair Colour": random_hair_colour(),
    "Skin Colour": updated_random_skincolours(),
    "Profession": random_profession(),
    "Allergies": random_allergies(),
    "Commitment": random_commitment(),
    "Work Preference": random_work_preference(),
} for _ in range(50)])

volunteers_unique = remove_duplicate_names(volunteers)
file_path = '/Users/mehdiamrani/Desktop/projectmoney/uni project/updated_recruiter.csv'
volunteers_unique.to_csv(file_path, index=False)
print(f"Saved to {file_path}")

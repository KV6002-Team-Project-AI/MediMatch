import pandas as pd
import random
import csv



random.seed(42)


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

def random_age():
    return random.randint(18, 65)

def random_height():
    return random.randint(150, 200)

def random_weight():
    return random.randint(50, 120)

def random_gender():
    return random.choice(["Male", "Female"])

def random_hair_colour():
    colours = ["Black", "Brown", "Blonde", "Red", "Grey", "White"]
    return random.choice(colours)

def updated_random_skincolours():
    colours = ["Light", "Medium", "Olive", "Tan", "Brown", "Dark"]
    return random.choice(colours)

def random_profession():
    professions = ["Teacher", "Engineer", "Doctor", "Artist", "Nurse", "Developer", "Chef", "Musician", "Writer", "Scientist"]
    return random.choice(professions)

def random_allergies():
    return random.choice(["No allergies", "Foods", "Animals", "Pollen", "Mold", "Dust Mites",
        "Medications", "Latex", "Insect Stings", "Perfumes/Household Chemicals"])

def random_commitment():
    return random.choice(["Short Term", "Long Term","any"])

def random_work_preference():
    return random.choice(["Team", "Solo","any"])

def remove_duplicate_names(df):

    return df.drop_duplicates(subset=['Name'], keep=False)

# Generate the dataset
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
} for _ in range(2000)])

volunteers_unique = remove_duplicate_names(volunteers)
file_path = '/Users/mehdiamrani/Desktop/projectmoney/uni project/volunteers_unique.csv'
volunteers_unique.to_csv(file_path, index=False)
file_path
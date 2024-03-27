import base64

# Specify the path to your key file
file_path = r'C:\Users\Jed Bywater\OneDrive - Northumbria University - Production Azure AD\Documents\GitHub\MediMatch\medimatch-418221-2d599ed1a97c.json'

try:
    # Attempt to open and read the key file
    with open(file_path, 'rb') as key_file:
        key_file_content = key_file.read()
        encoded_content = base64.b64encode(key_file_content).decode('utf-8')
    print("Encoded content:")
    print(encoded_content)
except FileNotFoundError:
    print(f"Error: The file was not found at '{file_path}'.")
except PermissionError:
    print(f"Error: Permission denied when accessing the file at '{file_path}'.")
except Exception as e:
    # Catch any other exception and print its message
    print(f"An unexpected error occurred: {e}")

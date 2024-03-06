# MediMatch

Provide a short description of your project here. What is the purpose of MediMatch? What does it do?

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them:

- [Python](https://www.python.org/downloads/) - Programming language used for the backend.
- [Node.js and npm](https://nodejs.org/en/download/) - JavaScript runtime and package manager for the frontend.

### Installing  

A step-by-step series of commands that tell you how to get a development environment running:  

### Clone this repository onto your PC using the following instructions:  
1. Head over to the KV6002-TEAM_PROJECT_AI  
2. Choose the MediMatch Repository  
3. CLick on code <>, then click on clone using Github desktop  

#### Backend Dependencies  

`pip install Django djangorestframework`  

#### Frontend Dependencies (All of this is in trapp directory)  

Follow the instructions below to set up React.

## Setup 🛠️  
1. Go inside the **trapp** folder, right click and open *terminal*.  
2. Run this to install node modules: `npm install`  
3. Install **React Router**: `npm install react-router-dom`  
4. Install **Tailwind** for CSS: `npm install -D tailwindcss postcss autoprefixer`  
5. Install **SweetAlert2** for alert dialogs: `npm install sweetalert2`  

## Running the Application

To set up and run the project locally, follow these steps:

1. **Build the React Frontend:**  
`cd trapp` Run this command in root directory for project.  
`npm run build` This command compiles the React frontend code, preparing it for production.  
`cd ../`, go back into main directory and run the server.

3. **Collect Static Files:**  
`python manage.py collectstatic`   Django collects all static files into the `STATIC_ROOT` directory. Confirm the action when prompted.

4. **Run the Django Server:**  
`python manage.py runserver`   Starts the Django server allowing access to the application.

5. **Access the Application:**  
Open your web browser and visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the application.

Ensure you have all the necessary prerequisites installed before running these steps, and replace the URL with the specific endpoint you need, if necessary.

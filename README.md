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

#### Backend Dependencies  

`pip install Django djangorestframework`

## Running the Application

To set up and run the project locally, follow these steps:

1. **Build the React Frontend:**  
`cd trapp` Run this command in root directory for project.  
`npm run build` This command compiles the React frontend code, preparing it for production.  
'cd ../', go back into main directory and run the server.

3. **Collect Static Files:**  
'python manage.py collectstatic'   Django collects all static files into the `STATIC_ROOT` directory. Confirm the action when prompted.

4. **Run the Django Server:**  
'python manage.py runserver'   Starts the Django server allowing access to the application.

5. **Access the Application:**  
Open your web browser and visit [http://127.0.0.1:8000/](http://127.0.0.1:8000/) to view the application.

Ensure you have all the necessary prerequisites installed before running these steps, and replace the URL with the specific endpoint you need, if necessary.

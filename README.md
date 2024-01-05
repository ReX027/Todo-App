# Todo App
A fully Responsive Todo App built using React.js and Nodejs.

## Table of Contents

- [Features](#features)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Running the App](#running-the-app)
- [Tech Stack](#tech-stack)

## Features

- Add, edit, and delete todos
- Mark todos as completed
- User authentication
- Persistent data storage on mongodb

## Project Structure

#Backend
- [index.js](./index.js): Main entry point for the Express server. Handles server   
                      logic and routing.
- [views](./views): Contains Pug files for rendering views.
- [static](./static): Houses static assets such as CSS, images, and JavaScript 
                      files.
- [models](./models) It has the user schema model.
- [db.js](./db.js) To connect to the database.


## Getting Started

### Prerequisites

- Node.js (v14+)
- npm (v6+)
- MongoDB

### Backend
- **Install dependencies**:
  - npm init
  - npm install express
  - npm install mongoose
  - npm install cookie-parser
  - npm install dotenv
  - npm install cors
  - npm install bcrypt
  - npm install jsonwebtoken
  - npm start (Backend will run from this command)
  - The server will be accessible at http://localhost:PORT.

### Frontend
- **Install dependencies**:
  - npm create vite@latest
  - npm install axios
  - npm install react-hot-toast
  - npm run dev (Frontend will run from this command)
  - The frontend will be accessible at http://localhost:5173.
    
## Running the App
### Step 1: Download the Repository

 - Clone or download this repository as a ZIP file. Click on the "Code" button and select "Download ZIP."

## Step 2: Extract and Open

 - Extract the ZIP file to your local machine. Open the extracted folder in your preferred code editor (e.g., VSCode).

## Frontend Setup

 - Open a terminal and run the following commands:
      - cd ./frontend     
      - npm install
      - npm run dev
      
 - Open a new terminal and run:
   
## Backend Setup

 - Open a new terminal and run:
     - cd ./backend
     - npm install
     - npm start

## To run both frontend and backend together use concurrently

 - use npm run both on the frontend terminal
      - cd ./frontend
      - npm run both 
  
## Contributing
Feel free to contribute by opening issues or submitting pull requests.

# next_project
# PRIC_Assesment


---

# Employee Management System
To create a README file for your project, you'll want to include information that helps others understand what the project does, how to set it up, and how to use it. Here's a basic template you can use:



## Overview
Employee Management is a simple Next.js project with CRUD functionality for managing user data. Employees can be added, edited, and deleted. The project utilizes Firebase Firestore for data storage and management.

## Features
- Add new employees with their details such as name, surname, phone number, email, and experience.
- View a list of all employees with their details in a table format.
- Edit existing employee details.
- Delete employees from the system.

## Technologies Used
- Next.js
- Typescript
- Firebase Firestore
- Tailwind CSS
- Docker
- NextUI for table styling

## Setup
1. **Clone the repository:**
   ```bash
   git clone https://github.com/DivyaM310/next_project.git
   ```

2. **Install dependencies:**
   ```bash
   cd next_project
   npm install
   ```

3. **If you want set up your own firestore database:**
   - Create a firestore database on the [Firebase Console](https://console.firebase.google.com/).
   - Enable Firestore in the Firebase. 
   - Copy the Firebase configuration object and replace it in `firebaseconf.ts` file.

4. **Run the application:**
   ```bash
   npm run dev
   ```
   The application should now be running on [http://localhost:3000](http://localhost:3000).

## Docker
To run the application using Docker, follow these steps:
1. Build the Docker image:
   ```bash
   docker build -t next_project .
   ```

2. Run the Docker container:
   ```bash
   docker run -d -p 3000:3000 next_project 
   ```
   Visit [http://localhost:3000](http://localhost:3000) to view the application.

## Imported Packages
- `react`: A JavaScript library for building user interfaces.
- `firebase`: The Firebase SDK for JavaScript.
- `firebase/firestore`: Specific Firestore module for Firebase.
- `tailwindcss`: A utility-first CSS framework for quickly building custom designs.
 

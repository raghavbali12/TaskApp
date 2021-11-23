# TaskApp
A Web app for tracking tasks to-do

## Application Overview
This is an application that allows a user to track various tasks-to do in a simple but elegant UI. Users can add, delete and edit existing tasks, as well as set 
due-dates and reminders for individual tasks. 
![Alt text](/readme-screenshots/homepage.png?raw=true "Application homepage")

## Technical Overview
This project utilizes a C# backend with an MVC framework to create an API. The app uses the Entity Framework ORM to create SQL tables that is stored in a PostgreSQL 
database. The app frontend is written using React.js and various reusable components to create the UI. The front-end Javascript triggers a fetch API to send HTTP 
requests to the backend API for GET, POST and PUT requests tied to various actions.

## Initial setup
Create the PostgreSQL database by applying the following commands (commands may need to be adapted based on your database):

```
psql
CREATE DATABASE taskapp;
```

Create a super user and grant them the appropriate priviledges:

```
CREATE USER <username> WITH PASSWORD <password>;
GRANT ALL PRIVILEGES ON DATABASE taskapp TO <username>;
\q
```

Go to appsettings.Development.json and update the connection string: 
![Alt text](/readme-screenshots/connection_settings.png?raw=true "Connection string")

In the client folder (ClientApp), install the dependencies:

```
npm install
```

### Running the Application Locally
In the project folder (TaskApp), run the .NET app:

```
dotnet run
```
The application should be running on localhost:5000. Open it from your browser of choice.

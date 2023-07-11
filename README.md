# Welcome to RendezView

Here is the [Live Site Link](https://smelk.onrender.com/), check it out!

# Background

RendezView is a unique web application designed to streamline event planning amongst friends. Leveraging the power of OpenAI, RendezView generates event ideas, perfect for those who want to socialize but aren't sure what activities are available. It's also a great tool for coordinating get-togethers or celebrating special occasions when everyone's schedules are packed.

With just a few clicks, registered users can create an event and start sharing a link with their friends. Once logged in, users have full CRUD (Create, Read, Update, Delete) functionality to manage their events. This extends to schedules as well, allowing users to have full control over their event timings. RendezView is an ideal platform for users looking to organize, manage, and enjoy events with ease and convenience.

# Functionality & MVPs
RendezView comes with seven core features:

  1. Hosting on Render.com
     - Visit [RendezView](https://smelk.onrender.com/) for a live demo
    
  2. User Authentication & Demo User Account
     - Users can create their own account, login to an existing account, or use a demo user login
![image](https://github.com/kennyvungo/smelk/assets/128562494/58ef6d4d-e335-4890-b266-d29e5dae42f3)

  
  3. CRUD Functionality for Events
     - Logged-in users can create, read, update, and delete events
     - Non-logged-in users can only view events
![image](https://github.com/kennyvungo/smelk/assets/128562494/ce5631ad-5937-48dc-be2b-50509304e833)

  4. ChatGPT Event Generation
     - When initiating an event, users receive event suggestions while filling out the questionnaire
     - Suggestions are based on event details and will name the event upon selection
  ![image](https://github.com/kennyvungo/smelk/assets/128562494/d5997205-5945-4f65-a13e-31eb45bc5188)

  5. CRUD Functionality for Schedules
     - All users can create, read, update, and delete schedules
     - Users can create their own schedule for an event after entering their first and last name
  ![image](https://github.com/kennyvungo/smelk/assets/128562494/02b2c4c8-ea0d-4ef9-87e4-42f00ea7ec67)


  6. Aggregate Schedule
     - Once a schedule is created, users can view all the different schedules associated with the event from various users
     - TThe aggregate schedule combines all the selected times from all users and generates a heat map-like display
     - Users can view all individuals associated with a specific time slot by hovering over the aggregate schedule

  ![image](https://github.com/kennyvungo/smelk/assets/128562494/3453458c-b148-40d5-9123-706b46b8cdd1)

  7. Production ReadMe

# Technologies, Libraries, APIs

- Languages: JavaScript, HTML, and CSS
- Frontend: React and Redux
- Backend: Express, Node.js
- Database: MongoDB
- Hosting: Render
- APIs: ChatGPT
- Libraries: Date-fns, React-Icons 

# Creators
- Lauren, Misha, Kenny, Shanna, Ernest

# Thank You
- RendezView was created within a 5-day timeframe by a team of five individuals
- Thanks for checking out our website! We hope you find it useful and enjoyable.

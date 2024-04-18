# LackLuster

![Project Logo](images/lackluster.jpeg)

## Description
LackLuster is a parody application loosely named after BlockBuster that allows admins to create an account, log in and manage game rentals.

## Getting Started
- **Deployed App (Frontend):** [https://lackluster-frontend.netlify.app](https://lackluster-frontend.netlify.app)
- **Deployed App (Backend):** [https://lackluster-03e1f83af3ca.herokuapp.com/](https://lackluster-03e1f83af3ca.herokuapp.com/)
- **Trello Board:** [https://trello.com/b/NGABs7vH/lackluster](https://trello.com/b/NGABs7vH/lackluster)

## MVP Features

- As a user, I want to log in to my account so that I can access my profile.
- As a user, I want to be able to see all the customer so that I am aware of my clientele.
- As a user, I want to be able to see all of the games so that I can manage my catalog.
- As a user, I want to be able to add customers so that the list of customers stays up-to-date
- As a user, I want to be able to add games so that our current collections is up-to-date
- As a user, I want to be able to update customer names so that name errors or name changes can be fixed
- As a user, I want to be able to update games so that game name errors can be fixed.
- As a user, I want to be able delete customers so that our current clientele stays up-to-date
- As a user, I want to be able to delete games so that our collection reflects our current inventory

## Stretch Goals

- As a user, I want to connect to a video game API so that users can see images of our games
- As a user, I want to be able to have customers manage their own accounts
- As a user, I want to experience a visually pleasing website so that I am compelled to use it

## Development Plan

### Day 1: Project Setup and User Authentication

- Set up the project structure and initialize a Git repository.
- Implement user authentication using JWT or a similar method.

### Day 2: Database Schema and Food Inventory Management

- Design and implement the MongoDB schema for the game catalog and customers.
- Implement API endpoints for adding and viewing customers and games in the inventory.

### Day 3: Food Inventory Management

- Implement API endpoints for updating and deleting customers and games in the inventory.
- Test CRUD operations.

### Day 4: User Interface Development

- Set up the frontend framework or start with plain HTML, CSS, and JavaScript.
- Develop the user interface for user authentication.

### Day 5: User Interface Development

- Develop the user interface for managing the customers and game inventory.
- Implement form validation and error handling.

### Day 6: Testing and Bug Fixing

- Conduct thorough testing of the application.
- Fix any bugs or issues.

### Day 7: Final Touches and Deployment

- Add any final touches to the user interface or functionality.
- Deploy the application to Heroku.


## Attributions
- bcrypt
- config
- dotenv
- mongoose
- cors

## Technologies Used
- Frontend: HTML, CSS, JavaScript
- Backend: Node.js, 
- Database: MongoDB


## Next Steps
- Separation of admin vs standard account
- Connect to video game API to generate photos

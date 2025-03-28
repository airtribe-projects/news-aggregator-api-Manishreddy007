# News Aggregator API

The News Aggregator API is a Node.js-based backend application that allows users to register, log in, manage their preferences, and fetch news articles based on their preferences. It uses MongoDB for data storage and integrates with the NewsAPI to fetch news articles.

## Features

- **User Registration**: Users can sign up with their email, name, password, and preferences.
- **User Login**: Users can log in to receive a JWT token for authentication.
- **Manage Preferences**: Users can view and update their preferences.
- **Fetch News**: Fetch news articles based on user preferences using the NewsAPI.
- **Authentication**: Secure endpoints using JWT-based authentication.

## Prerequisites

- Node.js (version 18 or higher)
- MongoDB (local or cloud instance)
- NewsAPI Key (get one from [NewsAPI](https://newsapi.org/))

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/news-aggregator-api.git
   cd news-aggregator-api
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add the following environment variables:
   ```
   PORT=3000
   MONGODB_URI=your-mongodb-connection-string
   JWT_SECRET=your-jwt-secret
   NEWS_API_KEY=your-newsapi-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

5. Run tests:
   ```bash
   npm run test
   ```

## API Endpoints

### User Routes

#### POST `/users/signup`
- **Description**: Register a new user.
- **Request Body**:
  ```json
  {
    "name": "Clark Kent",
    "email": "clark@superman.com",
    "password": "Krypt()n8",
    "preferences": ["movies", "comics"]
  }
  ```
- **Response**:
  - `201`: User created successfully.
  - `409`: Email already exists.
  - `400`: Missing mandatory fields.

#### POST `/users/login`
- **Description**: Log in an existing user.
- **Request Body**:
  ```json
  {
    "email": "clark@superman.com",
    "password": "Krypt()n8"
  }
  ```
- **Response**:
  - `200`: Returns a JWT token.
  - `401`: Incorrect password.
  - `404`: User not found.

#### GET `/users/preferences`
- **Description**: Get user preferences.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  - `200`: Returns user preferences.
  - `401`: Unauthorized.

#### PUT `/users/preferences`
- **Description**: Update user preferences.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Request Body**:
  ```json
  {
    "preferences": ["movies", "comics", "games"]
  }
  ```
- **Response**:
  - `200`: Preferences updated successfully.
  - `401`: Unauthorized.

### News Routes

#### GET `/news`
- **Description**: Fetch news articles based on user preferences.
- **Headers**:
  ```json
  {
    "Authorization": "Bearer <token>"
  }
  ```
- **Response**:
  - `200`: Returns news articles.
  - `400`: No preferences found.
  - `401`: Unauthorized.



## Running Tests

To run the test suite:
```bash
npm run test
```



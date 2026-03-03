# GraphQL CRUD App (Apollo Server + Apollo Client)

Full-stack GraphQL learning project built with a Node.js backend and a React frontend.  
It demonstrates real-world CRUD patterns, file upload support, and live subscription updates.

## Features

- Create, read, update, and delete users with GraphQL.
- Upload user profile images through GraphQL `Upload` scalar.
- Store images in Cloudinary and save URLs in MongoDB.
- Receive real-time `userCreated` subscription events.
- Apollo Client setup with split links for HTTP and WebSocket operations.
- Clean, responsive dashboard UI for practical frontend learning.

## Tech Stack

- Backend: Node.js, Express 5, Apollo Server, GraphQL, Mongoose, `graphql-upload`, `graphql-ws`
- Frontend: React 19, Vite, Apollo Client, `apollo-upload-client`
- Database: MongoDB
- Media Storage: Cloudinary

## Project Structure

```text
CRUD/
  backend/
    src/
      config/
        db.js
        cloudnairy.js
      models/
        user.model.js
      schema/
        typeDefs.js
        resolvers.js
      index.js
    package.json
  frontend/
    src/
      apollo/
        client.js
      components/
        CreateUser.jsx
        UserNotification.jsx
        UsersList.jsx
      graphql/
        mutations.js
        queries.js
        subscriptions.js
      App.jsx
      App.css
      index.css
    package.json
  README.md
```

## Prerequisites

- Node.js 18+
- npm
- MongoDB connection string
- Cloudinary account credentials

## Environment Variables

Create a `backend/.env` file:

```env
PORT=4000
MONGO_URI=your_mongodb_connection_string
CLOUDNARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDNARY_API_KEY=your_cloudinary_api_key
CLOUDNARY_API_SECRET=your_cloudinary_api_secret
```

## Installation

Install backend dependencies:

```bash
cd backend
npm install
```

Install frontend dependencies:

```bash
cd ../frontend
npm install
```

## Run the Application

Start backend:

```bash
cd backend
npm run dev
```

Start frontend in a second terminal:

```bash
cd frontend
npm run dev
```

## Default Local URLs

- Frontend: `http://localhost:5173`
- GraphQL API (HTTP): `http://localhost:4000/graphql`
- GraphQL Subscriptions (WS): `ws://localhost:4000/graphql`

## GraphQL API

### Type

- `User { id, name, email, age, profileImage }`

### Queries

- `getUsers: [User!]!`
- `getUser(id: ID!): User`

### Mutations

- `createUser(name, email, age, profileImage): User!`
- `updateUser(id, name, email, age, profileImage): User`
- `deleteUser(id): User`

### Subscription

- `userCreated: User!`

## Example Operations

Get all users:

```graphql
query GetUsers {
  getUsers {
    id
    name
    email
    age
    profileImage
  }
}
```

Create a user:

```graphql
mutation CreateUser {
  createUser(name: "Aisha", email: "aisha@example.com", age: 24) {
    id
    name
    email
    age
    profileImage
  }
}
```

Subscription:

```graphql
subscription OnUserCreated {
  userCreated {
    id
    name
    email
  }
}
```

## Notes

- Backend CORS is currently open for local learning usage.
- Cloudinary uploads are stored in the `user-profiles` folder inside resolvers.
- No automated tests are configured yet.

## License

ISC

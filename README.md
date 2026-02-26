# GraphQL CRUD API (Node.js + Apollo + MongoDB)

This repository contains a backend GraphQL API for basic **User CRUD operations** with optional **profile image upload** support via Cloudinary.

The project is built to demonstrate a clean, practical GraphQL setup using:
- Express 5
- Apollo Server
- MongoDB + Mongoose
- GraphQL file upload (`Upload` scalar)
- Cloudinary integration for image hosting

## What This Project Does

It provides a GraphQL endpoint where you can:
- Create a user
- Read all users or one user by ID
- Update a user
- Delete a user
- Upload and store a user profile image URL

## Repository Structure

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
    .env.example
    package.json
```

## API Endpoint

After starting the server, GraphQL runs at:

```text
http://localhost:<PORT>/graphql
```

Default fallback port in code is `4000` if `PORT` is not set.

## Prerequisites

Make sure you have:
- Node.js (18+ recommended)
- npm
- MongoDB database URI (MongoDB Atlas or local)
- Cloudinary account credentials

## Environment Variables

Copy `backend/.env.example` to `backend/.env` and fill in real values:

```env
MONGO_URI="your mongodb connection string"
PORT="4000"
CLOUDNARY_CLOUD_NAME="your cloudinary cloud name"
CLOUDNARY_API_KEY="your cloudinary api key"
CLOUDNARY_API_SECRET="your cloudinary api secret"
CLOUDNARY_FOLDER_NAME="your cloudinary folder name"
```

Note: In the current resolver implementation, uploads are stored in a fixed folder (`user-profiles`). The `CLOUDNARY_FOLDER_NAME` variable exists in env but is not yet used in resolver logic.

## Installation and Run

From the project root:

```bash
cd backend
npm install
npm run dev
```

You should see logs for:
- MongoDB connection success
- Cloudinary configuration success
- Server URL

## GraphQL Schema (Current)

### Type
- `User { id, name, email, age, profileImage }`

### Queries
- `getUsers: [User!]!`
- `getUser(id: ID!): User`

### Mutations
- `createUser(name, email, age, profileImage): User!`
- `updateUser(id, name, email, age, profileImage): User`
- `deleteUser(id): User`

## Example Operations

### 1) Get all users

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

### 2) Get one user by ID

```graphql
query GetUserById {
  getUser(id: "PUT_USER_ID_HERE") {
    id
    name
    email
    age
    profileImage
  }
}
```

### 3) Create user (without image)

```graphql
mutation CreateUser {
  createUser(name: "Alice", email: "alice@example.com", age: 24) {
    id
    name
    email
    age
    profileImage
  }
}
```

### 4) Update user

```graphql
mutation UpdateUser {
  updateUser(id: "PUT_USER_ID_HERE", name: "Alice Updated", age: 25) {
    id
    name
    email
    age
    profileImage
  }
}
```

### 5) Delete user

```graphql
mutation DeleteUser {
  deleteUser(id: "PUT_USER_ID_HERE") {
    id
    name
    email
  }
}
```

### 6) Upload profile image

Use a GraphQL client that supports multipart upload (for example Altair, Apollo Sandbox with upload support, or Postman GraphQL).

```graphql
mutation CreateUserWithImage($file: Upload!) {
  createUser(name: "Bob", email: "bob@example.com", age: 27, profileImage: $file) {
    id
    name
    profileImage
  }
}
```

## Notes for Developers

- Email uniqueness is enforced in both logic and schema (`unique: true`).
- Error handling is currently done with generic `Error` messages in resolvers.
- The project is backend-only right now (no frontend app in this repo).
- There is no test suite configured yet.

## Possible Next Improvements

- Add input validation (e.g. `zod` or `joi`)
- Add authentication and authorization
- Add pagination/filtering for `getUsers`
- Add a proper logging strategy
- Add unit/integration tests
- Use `CLOUDNARY_FOLDER_NAME` from env in upload logic

## License

ISC

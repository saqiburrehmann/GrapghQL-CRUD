export const typeDefs = `
    scalar Upload

    type User {
        id: ID!
        name: String!
        email: String!
        age: Int!
        profileImage: String
    }

    type Query {
        getUsers: [User!]!
        getUser(id: ID!): User
    }
    
    type Mutation {
        createUser(name: String!, email: String!, age: Int!, profileImage: Upload): User!
        updateUser(id: ID!, name: String, email: String, age: Int, profileImage: Upload): User
        deleteUser(id: ID!): User
    }

    type Subscription {
        userCreated: User!
    }
`;
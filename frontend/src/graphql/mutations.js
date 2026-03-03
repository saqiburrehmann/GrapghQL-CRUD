import { gql } from "@apollo/client";

export const CREATE_USER = gql`
  mutation CreateUser(
    $name: String!
    $email: String!
    $age: Int!
    $profileImage: Upload
  ) {
    createUser(
      name: $name
      email: $email
      age: $age
      profileImage: $profileImage
    ) {
      id
      name
      email
      age
      profileImage
    }
  }
`;
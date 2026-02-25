import { User } from "../models/user.model.js";

export const resolvers = {
    Query: {
        getUsers: async () => {
            try {
                return await User.find();
            } catch (error) {
                throw new Error("Error fetching users: " + error.message);
            }
        },
        getUser: async (_, { id }) => {
            try {
                return await User.findById(id);
            } catch (error) {
                throw new Error("Error fetching user: " + error.message);
            }
        }
    },
    Mutation: {
        createUser: async (_, { name, email, age }) => {
            try {
                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("Email already in use");
                }

                const newUser = new User({ name, email, age });
                return await newUser.save();
            } catch (error) {
                throw new Error("Error creating user: " + error.message);
            }
        },
        updateUser: async (_, { id, name, email, age }) => {
            try {
                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    { name, email, age },
                    { new: true }
                );
                return updatedUser;
            } catch (error) {
                throw new Error("Error updating user: " + error.message);
            }

        },
        deleteUser: async (_, { id }) => {
            try {   
                const deletedUser = await User.findByIdAndDelete(id);
                return deletedUser;
            } catch (error) {
                throw new Error("Error deleting user: " + error.message);
            }
        }
    }
}
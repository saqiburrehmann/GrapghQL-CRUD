import { User } from "../models/user.model.js";
import GraphQLUpload from "graphql-upload/GraphQLUpload.mjs";
import cloudinary from "../config/cloudnairy.js";

export const resolvers = {

    Upload: GraphQLUpload,

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
        createUser: async (_, { name, email, age, profileImage }) => {
            try {
                let profileImageUrl = "";

                if (profileImage) {
                    const { createReadStream } = await profileImage;
                    const stream = createReadStream();

                    const uploadResult = await new Promise((resolve, reject) => {
                        const cloudinaryStream = cloudinary.uploader.upload_stream(
                            { folder: "user-profiles" },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                        stream.pipe(cloudinaryStream);
                    });

                    profileImageUrl = uploadResult.secure_url;
                }

                const existingUser = await User.findOne({ email });
                if (existingUser) {
                    throw new Error("Email already in use");
                }

                const newUser = new User({
                    name,
                    email,
                    age,
                    profileImage: profileImageUrl
                });

                return await newUser.save();

            } catch (error) {
                throw new Error("Error creating user: " + error.message);
            }
        },
        updateUser: async (_, { id, name, email, age, profileImage }) => {
            try {
                let profileImageUrl;

                if (profileImage) {
                    const { createReadStream } = await profileImage;
                    const stream = createReadStream();

                    const uploadResult = await new Promise((resolve, reject) => {
                        const cloudinaryStream = cloudinary.uploader.upload_stream(
                            { folder: "user-profiles" },
                            (error, result) => {
                                if (error) reject(error);
                                else resolve(result);
                            }
                        );

                        stream.pipe(cloudinaryStream);
                    });

                    profileImageUrl = uploadResult.secure_url;
                }

                const updatedUser = await User.findByIdAndUpdate(
                    id,
                    {
                        ...(name && { name }),
                        ...(email && { email }),
                        ...(age && { age }),
                        ...(profileImageUrl && { profileImage: profileImageUrl })
                    },
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
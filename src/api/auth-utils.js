import axios from "axios";
import Boom from "@hapi/boom";
import { createToken } from "./jwt-utils.js";
import dotenv from "dotenv";

const result = dotenv.config();

async function verifyIdToken(idToken) {
    try {
        // Call the Firebase REST API to verify the ID token
        const response = await axios.post(
            `https://www.googleapis.com/identitytoolkit/v3/relyingparty/getAccountInfo?key=${process.env.firebase_api}`,
            { idToken }
        );

        // Parse the response data
        const data = response.data;

        // Check if the ID token is valid and has user data
        if (data.users && data.users.length > 0) {
            return data.users[0]; // Return the user data
        } else {
            throw new Error("Invalid ID token");
        }
    } catch (error) {
        throw new Error("Error verifying ID token: " + error.message);
    }
}

export async function convertIdTokenToJwt(idToken) {
    try {
        // Verify the ID token and get the user data
        const userData = await verifyIdToken(idToken);

        // Create a JWT with the user's information
        const jwt = createToken(userData);

        return jwt;
    } catch (error) {
        throw new Error("Error converting ID token to JWT: " + error.message);
    }
}
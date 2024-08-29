import { RANDOM_USER_API_URL } from "../utils/constants";
import { unicodeToChar } from "../utils/functions";

/**
 * Fetches users from the RANDOM_USER_API_URL.
 * 
 * @param {number} size - The number of users to fetch. Default is 100.
 * @returns {Promise<Array<Object>>} - A promise that resolves to an array of user objects.
 * @throws {Error} - If the network response is not ok.
 */

// This variable is used to generate unique IDs for the users.
let staticCounterUsers = 0;

export async function fetchUsers(size = 100) {
    try {
        const response = await fetch(RANDOM_USER_API_URL + "?size=" + size);
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return processData(data);
    } catch (error) {
        console.error("Fetching users failed:", error);
    }
}

/**
 * Processes the user data and returns an array of user objects.
 * 
 * @param {Array<Object>} users - The array of user data to process.
 * @returns {Array<Object>} - The processed array of user objects.
 */

function processData(users) {
    return users.map(user => {
        let id = Number(user.id + "" + staticCounterUsers);
        let completeName = user.first_name + " " + user.last_name;
        let urlAvatarProcessed = unicodeToChar(user.avatar);
        staticCounterUsers++;
        return {
            id,
            name: completeName,
            email: user.email,
            phone: user.phone_number,
            avatar: urlAvatarProcessed
        };
    });
}

import { RANDOM_USER_API_URL } from "../utils/constants";
import { unicodeToChar } from "../utils/functions";

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

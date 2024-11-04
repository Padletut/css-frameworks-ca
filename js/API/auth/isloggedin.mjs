import { loadStorage } from "../../storage/loadstorage.mjs";

// Function to check if user is logged in
export function isLoggedIn() {
    const accessToken = loadStorage("accessToken");
    return accessToken ? true : false;
}
import { saveStorage } from "../../storage/savestorage.mjs";

// Function to log out user
export function logout() {
    saveStorage("accessToken", "");
    saveStorage("profile", "");
    window.location.replace("../index.html");
}
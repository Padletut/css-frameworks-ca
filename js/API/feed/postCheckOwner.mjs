// Check if the logged in user is the owner of the post and add the edit and delete buttons
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

export function postCheckOwner(postAuthor) {
    if (loggedInUser.name === postAuthor) {
        return true;
    }
    return false;
}
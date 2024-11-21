import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Checks if the logged-in user is the owner of the post.
 * @param {string} postAuthor - The author of the post.
 * @returns {boolean} True if the logged-in user is the owner of the post, false otherwise.
 * @example
 * ```javascript
 * const isOwner = postCheckOwner("john_doe");
 * console.log(isOwner); // true or false
 * ```
 */
export function postCheckOwner(postAuthor) {
    if (loggedInUser.name === postAuthor) {
        return true;
    }
    return false;
}
import { loadStorage } from "../../storage/loadstorage.mjs";

/**
 * Checks if the user is logged in.
 * @memberof module:Authorization
 * @returns {boolean} True if the user is logged in, false otherwise.
 * @example
 * ```javascript
 * const loggedIn = isLoggedIn();
 * console.log(loggedIn); // true or false
 * ```
 */
export function isLoggedIn() {
    const accessToken = loadStorage("accessToken");
    return accessToken ? true : false;
}
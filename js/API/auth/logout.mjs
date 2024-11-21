import { saveStorage } from "../../storage/savestorage.mjs";

/**
 * Logs out the user by clearing the access token and profile from storage and redirecting to the index page.
 * @example
 * ```javascript
 * logout();
 * ```
 */
export function logout() {
    saveStorage("accessToken", "");
    saveStorage("profile", "");
    window.location.replace("../index.html");
}
import { getProfile } from "./getprofile.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

// Function to check if the logged in user is the owner of the profile

/**
 * Check if the logged in user is the owner of the profile and add the edit button
 * @param {Object} profile - The profile object.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" } };
 * checkProfileOwner(profile);
 * ```
 */
export function checkProfileOwner(profile) {
    const { name: profileName = {} } = profile;
    const { name: loggedInUserName } = {} = loggedInUser;

    return profileName === loggedInUserName;
}
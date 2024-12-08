import * as global from "../../constants.mjs";
import { fetchData } from "../../utils/fetch.mjs";
import { renderErrors } from "../rendererrors.mjs";


const { API_BASE_URL, API_PROFILES } = global;

/**
 * Follows a profile by its name.
 * @memberof module:Profile
 * @param {string} profileName - The name of the profile to follow.
 * @returns {Promise<void>} A promise that resolves when the profile is followed.
 * @example
 * ```javascript
 * await followProfile("john_doe");
 * ```
 */
export async function followProfile(profileName) {
    try {
        const response = await fetchData(`${API_BASE_URL}${API_PROFILES}/${profileName}/follow`, {
            method: "PUT",
            headers: false
        });

        if (!response.ok) {
            console.error("Server response:", response);
            throw new Error("Failed to follow profile");
        }
    } catch (error) {
        console.error("Error following profile:", error);
        renderErrors(new Error("An error occurred while following profile "));
    }
}
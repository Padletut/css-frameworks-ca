import * as global from "../../constants.mjs";
import { fetchData } from "../../fetch/fetch.mjs";
import { handleErrors } from "../../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;

/**
 * Unfollows a profile by its name.
 * @memberof module:Profile
 * @param {string} profileName - The name of the profile to unfollow.
 * @returns {Promise<void>} A promise that resolves when the profile is unfollowed.
 * @example
 * ```javascript
 * await unfollowProfile("john_doe");
 * ```
 */
export async function unfollowProfile(profileName) {
    try {
        const response = await fetchData(`${API_BASE_URL}${API_PROFILES}/${profileName}/unfollow`, {
            method: "PUT",
            headers: false
        });

        if (!response.ok) {
            throw new Error("Failed to unfollow profile");
        }
    } catch (error) {
        console.error("Error unfollowing profile:", error);
        handleErrors(new Error("An error occurred while unfollowing profile"));
    }
}
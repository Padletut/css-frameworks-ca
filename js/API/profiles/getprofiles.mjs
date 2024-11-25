import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;

/**
 * Fetches all profile data from the API across multiple pages.
 * @memberof module:Profile
 * @param {string} [filterName] - The name to filter profiles by (optional).
 * @returns {Promise<Array>} A promise that resolves to an array of all profile data.
 * @example
 * ```javascript
 * const profiles = await getAllProfiles();
 * console.log(profiles);
 * ```
 */
export async function getProfiles(filterName, queryParams) {

    try {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}?${queryParams.currentPage}`, {
            method: "GET",
        });
        return await response.json();
    } catch (error) {
        handleErrors(error);
    }
}
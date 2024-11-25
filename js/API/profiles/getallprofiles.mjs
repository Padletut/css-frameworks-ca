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
export async function getAllProfiles(filterName) {
    let allProfiles = [];
    let currentPage = 1;
    let isLastPage = false;

    while (!isLastPage) {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}?page=${currentPage}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            allProfiles = allProfiles.concat(data.data);
            currentPage = data.meta.currentPage + 1;
            isLastPage = data.meta.isLastPage;
        } else {
            handleErrors(response);
            break;
        }
    }

    return allProfiles;
}
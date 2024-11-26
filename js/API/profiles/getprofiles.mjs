import * as global from "../constants.mjs";
import { fetchData } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES, API_SEARCH } = global;

/**
 * Fetches profile data from the API based on the search query.
 * @param {boolean} search - Whether to use the search endpoint.
 * @param {URLSearchParams} queryParams - The query parameters.
 * @returns {Promise<Object>} A promise that resolves to an object containing the profile data.
 * @example
 * ```javascript
 * const profiles = await getProfiles(true, new URLSearchParams({ q: "john" }));
 * console.log(profiles);
 * ```
 */
export async function getProfiles(search = false, queryParams) {
    try {
        const endpoint = search ? `${API_BASE_URL}${API_PROFILES}${API_SEARCH}?${queryParams}` : `${API_BASE_URL}${API_PROFILES}?${queryParams}`;
        const response = await fetchData(endpoint, {
            method: "GET",
        });
        const data = await response.json();
        return data;
    } catch (error) {
        handleErrors(error);
    }
}
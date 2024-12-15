import * as global from "../constants.mjs";
import { fetchData } from "../utils/fetch.mjs";
import { renderErrors } from "../../ui/shared/rendererrors.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

const { API_BASE_URL, API_PROFILES } = global;

/**
 * Gets all posts by a specific user from the API.
 * @param {string} [profileName=loggedInUser.name] - The name of the profile.
 * @param {number} [currentPage=1] - The current page number for pagination.
 * @returns {Promise<Object>} A promise that resolves to the posts data.
 * @example
 * ```javascript
 * const posts = await getPostsbyUser("john_doe");
 * console.log(posts);
 * ```
 */
export async function getPostsbyUser(profileName = loggedInUser.name, queryParams) {

    const urlParams = new URLSearchParams(window.location.search);
    profileName = urlParams.get("profile") || profileName;

    // If profilename is an object, get the name property
    if (typeof profileName === "object") {
        profileName = profileName.data.name;
    }

    try {
        const endpoint = `${API_BASE_URL}${API_PROFILES}/${profileName}/posts?${queryParams.toString()}`;
        const response = await fetchData(endpoint, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            renderErrors(new Error("An error occurred while loading the posts"));
        }
    } catch (error) {
        // Handle error if posts not found with both original and lowercase names
        renderErrors(new Error("We couldn't find the posts for the profile you were looking for"));
        console.error("Error fetching posts by user:", error);
    }
}
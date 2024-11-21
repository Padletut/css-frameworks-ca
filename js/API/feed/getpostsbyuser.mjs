import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
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
export async function getPostsbyUser(profileName = loggedInUser.name, currentPage = 1) {

    const urlParams = new URLSearchParams(window.location.search);
    profileName = urlParams.get("profile") || profileName;

    // If profilename is an object, get the name property
    if (typeof profileName === "object") {
        profileName = profileName.data.name;
    }

    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true",
        limit: "10",
        page: currentPage,
    });

    // Helper function to fetch posts by user
    async function fetchPosts(name) {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${name}/posts?${queryParams.toString()}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            // Return null if profile not found
            return null;
        } else {
            throw new Error("An error occurred while fetching the posts");
        }
    }

    // Try fetching the posts with the provided profile name
    let posts = await fetchPosts(profileName);
    if (posts) {
        return posts;
    }

    // Retry with the lowercase profile name
    profileName = profileName.toLowerCase()
    posts = await fetchPosts(profileName);
    if (posts) {
        return posts;
    }

    // Handle error if posts not found with both original and lowercase names
    handleErrors(new Error("We couldn't find the posts for the profile you were looking for"));
}
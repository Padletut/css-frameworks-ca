import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Gets all posts from the API.
 * @param {number} [currentPage=1] - The current page number for pagination.
 * @returns {Promise<Object>} A promise that resolves to the posts data.
 * @example
 * ```javascript
 * const posts = await getPosts();
 * console.log(posts);
 * ```
 */
export async function getPosts(currentPage = 1, queryParams = { _author: "true", _comments: "true", _reactions: "true", limit: 10, page: currentPage }) {

    const response = await feedProfileFetch(`${API_BASE_URL}${API_POSTS}?${queryParams.toString()}`, {
        method: "GET",
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        handleErrors(response);
    }
}
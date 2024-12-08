import * as global from "../constants.mjs";
import { fetchData } from "../utils/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Gets a single post by ID.
 * @param {number} postId - The ID of the post to get.
 * @returns {Promise<Object>} A promise that resolves to the post data.
 * @example
 * ```javascript
 * const postId = 123;
 * const post = await getPost(postId);
 * console.log(post);
 * ```
 */

export async function getPost(postId) {

    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true"
    });

    const response = await fetchData(`${API_BASE_URL}${API_POSTS}/${postId}?${queryParams}`, {
        method: "GET",
    });
    if (response.ok) {
        const postData = await response.json();
        return postData.data;
    }

    await handleErrors(response);
}
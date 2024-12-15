import * as global from "../constants.mjs";
import { fetchData } from "../utils/fetch.mjs";
import { renderErrors } from "../../ui/shared/rendererrors.mjs";
import { getPost } from "../feed/getpost.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Toggles a reaction to a post.
 * @param {number} postId - The ID of the post to react to.
 * @param {string} symbol - The emoji symbol to react with.
 * @param {HTMLElement} likeCounterElement - The element displaying the like counter.
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @example
 * ```javascript
 * const postId = 123;
 * const symbol = "👍";
 * const likeCounterElement = document.querySelector(`#post-${postId} .like-counter`);
 * const updatedPost = await reactToPost(postId, symbol, likeCounterElement);
 * console.log(updatedPost);
 * ```
 */
export async function reactToPost(postId, symbol, likeCounterElement) {
    try {
        const response = await fetchData(`${API_BASE_URL}${API_POSTS}/${postId}/react/${symbol}`, {
            method: "PUT",
        });

        if (response.ok) {
            // Fetch the updated post data
            const updatedPost = await getPost(postId);

            // Update the like counter element
            likeCounterElement.textContent = `Like (${updatedPost._count.reactions})`;
            return updatedPost;
        } else {
            throw new Error("Failed to toggle reaction");
        }
    } catch (error) {
        console.error("Error toggling reaction:", error);
        renderErrors(new Error("An error occurred while toggling the reaction"));
    }
}
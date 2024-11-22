import * as global from "../../API/constants.mjs"
import { feedProfileFetch } from "../../API/fetch/fetch.mjs";
import { renderErrors } from "../../API/ui/rendererrors.mjs";

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
        const response = await feedProfileFetch(`${API_BASE_URL}${API_POSTS}/${postId}/react/${symbol}`, {
            method: "PUT",
        });

        if (response.ok) {
            const updatedPost = await response.json();
            likeCounterElement.textContent = `Like (${updatedPost.data.reactions.length})`;
            return updatedPost;
        } else {
            throw new Error("Failed to toggle reaction");
        }
    } catch (error) {
        console.error("Error toggling reaction:", error);
        renderErrors(error);
    }
}
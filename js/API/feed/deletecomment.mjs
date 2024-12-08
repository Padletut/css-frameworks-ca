import { fetchData } from "../utils/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Deletes a comment from a post.
 * @param {number} postId - The ID of the post.
 * @param {number} commentId - The ID of the comment to delete.
 * @param {boolean} [skipConfirmation=false] - Whether to skip the confirmation prompt.
 * @returns {Promise<void>} A promise that resolves when the comment is deleted.
 * @example
 * ```javascript
 * const postId = 123;
 * const commentId = 456;
 * await deleteComment(postId, commentId);
 * ```
 */
export async function deleteComment(postId, commentId, skipConfirmation = false) {

    if (!skipConfirmation) {
        const confirmation = confirm("Are you sure you want to delete this comment?");
        if (!confirmation) {
            return;
        }
    }

    const response = await fetchData(API_BASE_URL + API_POSTS + "/" + postId + "/comment/" + commentId, {
        headers: headers(true),
        method: "DELETE"
    });

    if (response.ok) {
        return;
    }

    await handleErrors(response);
}
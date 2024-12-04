import { fetchData } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Adds a comment to a post or replies to a comment.
 * @param {number} postId - The ID of the post.
 * @param {string} comment - The comment text.
 * @param {number|null} [replyToId=null] - The ID of the comment to reply to, or null if it's a top-level comment.
 * @returns {Promise<Object>} A promise that resolves to the added comment data.
 * @example
 * ```javascript
 * const postId = 123;
 * const comment = "This is a new comment.";
 * const replyToId = null; // or the ID of the comment to reply to
 * const newComment = await addComment(postId, comment, replyToId);
 * console.log(newComment);
 * ```
 */
export async function addComment(postId, comment, replyToId = null) {

    const commentData = {
        body: comment,
        replyToId: replyToId
    };

    const response = await fetchData(API_BASE_URL + API_POSTS + "/" + postId + "/comment", {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify(commentData)
    });

    if (response.ok) {
        console.log("Response:", response);
        return await response.json();
    }

    await handleErrors(response);
}
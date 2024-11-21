import * as global from "../constants.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import { renderPosts } from "../../ui/feed/renderposts.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Deletes a post after asking for confirmation and re-renders the posts.
 * @param {number} postId - The ID of the post to delete.
 * @param {string} profileName - The name of the profile to re-render posts for.
 * @returns {Promise<void>} A promise that resolves when the post is deleted and the posts are re-rendered.
 * @example
 * ```javascript
 * const postId = 123;
 * const profileName = "john_doe";
 * await deletePost(postId, profileName);
 * ```
 */
export async function deletePost(postId, profileName) {
    const confirmation = confirm("Are you sure you want to delete this post?");
    if (!confirmation) {
        return;
    }

    const response = await fetch(API_BASE_URL + API_POSTS + "/" + postId, {
        headers: headers(true),
        method: "DELETE"
    });

    if (response.ok) {
        await renderPosts(profileName); // Re-render posts with profileName
        return;
    }

    await handleErrors(response);
}
import { fetchData } from "../utils/fetch.mjs";
import { headers } from "../utils/headers.mjs";
import { handleErrors } from "../utils/handleerrors.mjs";
import * as global from "../constants.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Updates an existing post.
 * @param {number} postId - The ID of the post to update.
 * @param {string} title - The title of the post.
 * @param {string} body - The body content of the post.
 * @param {Array<string>} tags - An array of tags associated with the post.
 * @param {Object} [media] - The media associated with the post (optional).
 * @returns {Promise<Object>} A promise that resolves to the updated post data.
 * @example
 * ```javascript
 * const postId = 123;
 * const title = "Updated Post";
 * const body = "This is the updated content of the post.";
 * const tags = ["tag1", "tag2"];
 * const media = { url: "https://example.com/image.jpg" };
 * const updatedPost = await updatePost(postId, title, body, tags, media);
 * console.log(updatedPost);
 * ```
 */
export async function updatePost(postId, title, body, tags, media) {

    const postData = {
        title,
        body,
        tags
    };

    if (media) {
        postData.media = media;
    }

    const response = await fetchData(API_BASE_URL + API_POSTS + "/" + postId, {
        headers: headers(true),
        method: "PUT",
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        return await response.json();
    }

    await handleErrors(response);
}
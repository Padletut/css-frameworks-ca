import { fetchData } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Creates a new post.
 * @param {string} title - The title of the post.
 * @param {string} body - The body content of the post.
 * @param {Array<string>} tags - An array of tags associated with the post.
 * @param {string} [media] - The URL of the media associated with the post (optional).
 * @returns {Promise<Object>} A promise that resolves to the created post data.
 * @example
 * ```javascript
 * const title = "New Post";
 * const body = "This is the content of the new post.";
 * const tags = ["tag1", "tag2"];
 * const media = "https://example.com/image.jpg";
 * const newPost = await createPost(title, body, tags, media);
 * console.log(newPost);
 * ```
 */
export async function createPost(title, body, tags, media) {

    const postData = {
        title,
        body,
        tags,

    };

    if (media) {
        postData.media = media;
    }

    const response = await fetchData(API_BASE_URL + API_POSTS, {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        return await response.json();
    }

    await handleErrors(response);
}
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

// Function to update a post
// This function is called when the user submits the form to update an existing post
const { API_BASE_URL, API_POSTS } = global;

export async function updatePost(postId, title, body, tags, media) {

    const postData = {
        title,
        body,
        tags,
        media: media || {}
    };

    const response = await feedProfileFetch(API_BASE_URL + API_POSTS + "/" + postId, {
        headers: headers(true),
        method: "PUT",
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        console.log(response);
        return await response.json();
    }

    await handleErrors(response);
}
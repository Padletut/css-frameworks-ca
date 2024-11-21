import { feedProfileFetch } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

// Function to create a post
// This function is called when the user submits the form to create a new post

const { API_BASE_URL, API_POSTS } = global;

export async function createPost(title, body, tags, media) {

    const postData = {
        title,
        body,
        tags,

    };

    if (media) {
        postData.media = media;
    }

    const response = await feedProfileFetch(API_BASE_URL + API_POSTS, {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        return await response.json();
    }

    await handleErrors(response);
}
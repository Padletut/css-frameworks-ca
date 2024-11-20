import { feedProfileFetch } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
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
        media: media || {}
    };

    console.log(postData);

    const response = await feedProfileFetch(API_BASE_URL + API_POSTS, {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify(postData)
    });

    if (response.ok) {
        console.log(response);
        return await response.json();
    }

    await handleErrors(response);
}
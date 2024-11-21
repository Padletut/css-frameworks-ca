import { feedProfileFetch } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";

// Function to add a comment to a post or reply to a comment
// This function is called when the user submits the form to add a new comment
const { API_BASE_URL, API_POSTS } = global;

export async function addComment(postId, comment, replyToId = null) {

    const commentData = {
        body: comment,
        replyToId: replyToId
    };

    const response = await feedProfileFetch(API_BASE_URL + API_POSTS + "/" + postId + "/comment", {
        headers: headers(true),
        method: "POST",
        body: JSON.stringify(commentData)
    });

    if (response.ok) {
        return await response.json();
    }

    await handleErrors(response);
}
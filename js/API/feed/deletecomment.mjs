import { feedProfileFetch } from "../fetch/fetch.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import * as global from "../constants.mjs";


// Function to delete a comment
// This function is called when the user clicks the delete button on a comment

const { API_BASE_URL, API_POSTS } = global;

export async function deleteComment(postId, commentId, skipConfirmation = false) {

    if (!skipConfirmation) {
        const confirmation = confirm("Are you sure you want to delete this comment?");
        if (!confirmation) {
            return;
        }
    }

    const response = await feedProfileFetch(API_BASE_URL + API_POSTS + "/" + postId + "/comment/" + commentId, {
        headers: headers(true),
        method: "DELETE"
    });

    if (response.ok) {
        return;
    }

    await handleErrors(response);
}
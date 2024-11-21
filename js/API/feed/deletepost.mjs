import * as global from "../constants.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import { renderPosts } from "../../API/ui/feed/renderposts.mjs";

// Function to delete a post, ask for confirmation, and remove the post from the feed
// This function is called when the user clicks the "Delete" button on a post

const { API_BASE_URL, API_POSTS } = global;

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
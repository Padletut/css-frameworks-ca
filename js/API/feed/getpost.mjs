import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

// Fetches a single post from the API and return its data
export async function getPost(postID = "4057") {

    const { API_BASE_URL, API_POSTS } = global;

    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true",
    });

    const response = await feedProfileFetch(`${API_BASE_URL}${API_POSTS}/${postID}?${queryParams}`, {
        method: "GET",
    });

    if (response.ok) {
        const data = await response.json();
        console.log(data);
        return data;
    } else {
        handleErrors(response);
    }
}

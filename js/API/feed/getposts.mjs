import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import { getProfile } from "../profiles/getprofile.mjs";

const { API_BASE_URL, API_POSTS } = global;

// Get all posts from the API
export async function getPosts(currentPage = 1) {
    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true",
        limit: "10",
        page: currentPage,
    });

    const response = await feedProfileFetch(`${API_BASE_URL}${API_POSTS}?${queryParams.toString()}`, {
        method: "GET",
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        handleErrors(response);
    }
}
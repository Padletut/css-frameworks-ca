import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

const { API_BASE_URL, API_PROFILES } = global;

// Get all posts from the API
export async function getPostsbyUser(currentPage = 1) {
    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true",
        limit: "10",
        page: currentPage,
    });

    const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${loggedInUser.name}/posts?${queryParams.toString()}`, {
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
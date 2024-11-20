import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

const { API_BASE_URL, API_PROFILES } = global;

// Get all posts from the API
export async function getPostsbyUser(profileName = loggedInUser.name, currentPage = 1) {
    const urlParams = new URLSearchParams(window.location.search);
    profileName = urlParams.get("profile") || profileName;

    const queryParams = new URLSearchParams({
        _author: "true",
        _comments: "true",
        _reactions: "true",
        limit: "10",
        page: currentPage,
    });

    // Helper function to fetch posts by user
    async function fetchPosts(name) {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${name}/posts?${queryParams.toString()}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else if (response.status === 404) {
            // Return null if profile not found
            return null;
        } else {
            throw new Error("An error occurred while fetching the posts");
        }
    }

    // Try fetching the posts with the provided profile name
    let posts = await fetchPosts(profileName);
    if (posts) {
        return posts;
    }

    // Retry with the lowercase profile name
    posts = await fetchPosts(profileName.toLowerCase());
    if (posts) {
        return posts;
    }

    // Handle error if posts not found with both original and lowercase names
    handleErrors(new Error("We couldn't find the posts for the profile you were looking for"));
}
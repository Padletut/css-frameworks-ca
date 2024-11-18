import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { renderErrors } from "../ui/rendererrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;
const loggedInUser = loadStorage("profile");

// Fetches the profile data from the API
export async function getProfile(profileName = loggedInUser.name) {
    const queryParams = new URLSearchParams({
        _following: "true",
        _followers: "true",
        _posts: "true",
    });

    // Helper function to fetch profile data
    async function fetchProfile(name) {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${name}?${queryParams}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            return data;
        } else {
            return null;
        }
    }

    // Try fetching the profile with the provided name
    let profile = await fetchProfile(profileName);
    if (profile) {
        return profile;
    }

    // Retry with the lowercase profile name
    profile = await fetchProfile(profileName.toLowerCase());
    if (profile) {
        return profile;
    }

    // Render error if profile not found with both original and lowercase names
    renderErrors(new Error("We couldn't find the profile you were looking for"));
}
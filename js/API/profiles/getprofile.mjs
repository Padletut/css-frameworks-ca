import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;
const loggedInUser = loadStorage("profile");

// Fetches the profile data from the API
export async function getProfile(profileName = loggedInUser.name) {

    const queryParams = new URLSearchParams({
        _following: "true",
        _followers: "true",
        _posts: "true",
    });

    const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${profileName}?${queryParams}`, {
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
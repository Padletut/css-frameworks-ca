import * as global from "../constants.mjs";
import { headers } from "../headers.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;

// Fetches the profile data from the API
export async function getAllProfiles() {
    const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}`, {
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
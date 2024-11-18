import * as global from "../constants.mjs";
import { feedProfileFetch } from "../fetch/fetch.mjs";
import { handleErrors } from "../handleerrors/handleerrors.mjs";

const { API_BASE_URL, API_PROFILES } = global;

// Fetches all profile data from the API across multiple pages
export async function getAllProfiles(filterName) {
    let allProfiles = [];
    let currentPage = 1;
    let isLastPage = false;

    while (!isLastPage) {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}?page=${currentPage}`, {
            method: "GET",
        });

        if (response.ok) {
            const data = await response.json();
            console.log(data);
            allProfiles = allProfiles.concat(data.data);
            currentPage = data.meta.currentPage + 1;
            isLastPage = data.meta.isLastPage;
        } else {
            handleErrors(response);
            break;
        }
    }

    return allProfiles;
    // Find profile by contain pert of a name
    //const profile = allProfiles.filter(profile => profile.name.filter(name => name.includes(filterName)));
    //console.log(profile);
}
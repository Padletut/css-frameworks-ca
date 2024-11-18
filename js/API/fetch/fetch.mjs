import { headers } from "../headers.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

// Fetches the profile data from the API

export function feedProfileFetch(url, options = {}) {
    // Load the storage data and check if the user is logged in
    const storage = loadStorage();
    if (storage.token) {
        return fetch(url, {
            ...options,
            headers: headers(Boolean(options.body)),
        });
    }
}
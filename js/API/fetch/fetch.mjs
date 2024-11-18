import { headers } from "../headers.mjs";
import { isLoggedIn } from "../auth/isloggedin.mjs";

// Fetches the profile data from the API

export function feedProfileFetch(url, options = {}) {
    // Load check if the user is logged in
    if (isLoggedIn()) {
        return fetch(url, {
            ...options,
            headers: headers(Boolean(options.body)),
        });
    }
}
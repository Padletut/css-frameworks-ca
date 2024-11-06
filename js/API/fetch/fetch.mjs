import { headers } from "../headers.mjs";

// Fetches the profile data from the API

export function feedProfileFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers(Boolean(options.body)),
    });
}
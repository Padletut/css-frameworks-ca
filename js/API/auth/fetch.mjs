import { headers } from "../headers.mjs";

export function authFetch(url, options = {}) {
    return fetch(url, {
        ...options,
        headers: headers(Boolean(options.body)),
    });
}
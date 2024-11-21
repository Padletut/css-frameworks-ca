import { headers } from "../headers.mjs";
import { isLoggedIn } from "../auth/isloggedin.mjs";

/**
 * Performs an authenticated fetch request for profile and post feed data.
 * @param {string} url - The URL to fetch.
 * @param {Object} [options={}] - The options for the fetch request.
 * @param {string} [options.method] - The HTTP method to use (e.g., "GET", "POST").
 * @param {Object} [options.headers] - Additional headers to include in the request.
 * @param {Object} [options.body] - The body of the request.
 * @returns {Promise<Response>} A promise that resolves to the response of the fetch request.
 * @example
 * ```javascript
 * const response = await feedProfileFetch("https://api.example.com/data", {
 *     method: "POST",
 *     body: JSON.stringify({ key: "value" })
 * });
 * const data = await response.json();
 * console.log(data);
 * ```
 */
export function feedProfileFetch(url, options = {}) {
    // Load check if the user is logged in
    if (isLoggedIn()) {
        return fetch(url, {
            ...options,
            headers: headers(Boolean(options.body)),
        });
    }
}
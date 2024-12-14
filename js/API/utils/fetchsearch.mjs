import { getPosts } from "../feed/getposts.mjs";
import { getProfiles } from "../profiles/getprofiles.mjs";
import { renderErrors } from "../../ui/shared/rendererrors.mjs";
import { toggleLoader } from "../../ui/shared/toggleLoader.mjs";
import { renderSearchResults } from "../../ui/shared/rendersearchresults.mjs";


/* API Doc:
 * Search posts GET /social/posts/search?q=<query> Search for posts by their title or body properties.

Search profiles GET /social/profiles/search?q=<query> Search for profiles by their name or bio properties.
    */

/**
 * Searches for posts and profiles by their title or body properties.
 * @param {string} query - The search query.
 * @returns {Promise<void>} A promise that resolves when the search results are rendered.
 * @example
 * ```javascript
 * await search("hello");
 * ```
 */

export async function fetchSearch(query, tags = null) {

    const feedContainer = document.getElementById("feed-container");
    const loaderContainer = document.getElementById("loader-container");

    if (!query) return;

    if (!feedContainer) return;

    try {
        toggleLoader(true, loaderContainer);
        const queryParams = new URLSearchParams({
            _author: "true",
            _comments: "true",
            limit: "100",
            q: query,
        });

        const profileResponse = await getProfiles(true, queryParams);
        const postResponse = await getPosts(queryParams, true);

        const profiles = profileResponse.data;
        const posts = postResponse.data;

        const allResults = [...profiles, ...posts];
        renderSearchResults(allResults, feedContainer);

    } catch (error) {
        renderErrors(new Error("Failed to load search results " + error));
        console.error("Error searching posts:", error);
    } finally {
        toggleLoader(false, loaderContainer);
    }
}
import { getPosts } from "../../API/feed/getposts.mjs";
import { getProfiles } from "../../API/profiles/getprofiles.mjs";
import { renderErrors } from "../../API/ui/rendererrors.mjs";
import { toggleLoader } from "./toggleLoader.mjs";
import { renderSearchResults } from "./rendersearchresults.mjs";


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

export async function fetchSearch(query, tag = null) {

    const feedContainer = document.getElementById("feed-container");
    const loaderContainer = document.getElementById("loader-container");

    let responseProfiles;
    let profileData = [];

    if (!query && !tag) return;

    if (!query && tag) {
        // Reload web page
        location.reload();
    }

    if (!feedContainer) return;

    try {
        toggleLoader(true, loaderContainer);
        const queryParams = new URLSearchParams({
            _author: "true",
            _comments: "true",
            limit: "100",
            q: query,
        });

        if (!tag) {
            responseProfiles = await getProfiles(true, queryParams);
            profileData = responseProfiles.data;
        }

        if (tag) {
            queryParams.append("_tag", tag);
        }

        const responsePosts = await getPosts(queryParams, true);
        let postsData = responsePosts.data;
        // If tag is provided, filter out posts that do not have the tag
        if (tag) {
            postsData = postsData.filter(post => post.tags.includes(tag));
        }
        const searchResults = [...profileData, ...postsData];
        renderSearchResults(searchResults);

    } catch (error) {
        renderErrors(new Error("Failed to load search results " + error));
        console.error("Error searching posts:", error);
    } finally {
        toggleLoader(false, loaderContainer);
    }
}
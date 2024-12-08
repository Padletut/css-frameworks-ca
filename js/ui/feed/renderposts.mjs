import { getPosts } from "../../API/feed/getposts.mjs";
import { getPostsbyUser } from "../../API/feed/getpostsbyuser.mjs";
import { createPostCard } from "./createpostcard.mjs";
import { renderErrors } from "../shared/rendererrors.mjs";
import { toggleLoader } from "../shared/toggleLoader.mjs";
import { createShowMoreButton } from "../shared/createshowmorebutton.mjs";
import { filterPostsListener } from "../../events/filterpostslistener.mjs";

let nextPage;
let isLastPage = false;

/**
 * Renders posts for a given profile or all posts if no profile name is specified.
 * @param {string} [profileName] - The name of the profile.
 * @param {boolean} [append=false] - Whether to append the posts to the existing content.
 * @returns {Promise<void>} A promise that resolves when the posts are rendered.
 * @example
 * ```javascript
 * // Render posts for a specific profile
 * await renderPosts("john_doe");
 * 
 * // Render all posts
 * await renderPosts();
 * ```
 */
export async function renderPosts(profileName = null, append = false, tag = null) {

    const feedContainer = document.getElementById("feed-container");
    const loaderContainer = document.getElementById("loader-container");

    if (!feedContainer) return;

    if (!append) {
        feedContainer.innerHTML = "";
    }

    try {
        toggleLoader(true, loaderContainer);

        if (!nextPage) nextPage = 1;

        const queryParams = new URLSearchParams({
            _author: "true",
            _comments: "true",
            limit: "10",
            page: nextPage,
        });

        // Ternary operator to check if profile name is present
        const response = profileName ? await getPostsbyUser(profileName, queryParams) : await getPosts(queryParams);
        const posts = response.data;


        posts.forEach(post => createPostCard(post, profileName, feedContainer));
        if (!isLastPage && posts.length >= 10) {
            createShowMoreButton(() => renderPosts(profileName, true, tag));
        }

    } catch (error) {
        renderErrors("Failed to load posts " + error);
        console.error("Error rendering posts:", error);
    } finally {
        filterPostsListener(profileName, feedContainer);
        toggleLoader(false, loaderContainer);
    }
}
import { fetchPosts } from "./fetchposts.mjs";
import { createPostCard } from "./createpostcard.mjs";

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
export async function renderPosts(profileName, append = false) {
    const feedContainer = document.getElementById("feed-container");

    if (!feedContainer) return;

    if (!append) {
        feedContainer.innerHTML = "";
    }

    try {
        const posts = await fetchPosts(profileName);
        posts.data.forEach(post => createPostCard(post, profileName, feedContainer));
    } catch (error) {
        console.error("Error rendering posts:", error);
    }

    if (!isLastPage) {
        createShowMoreButton(profileName);
    }
}

/**
 * Creates a "Show More" button to load additional posts.
 * @param {string} profileName - The name of the profile.
 * @returns {HTMLButtonElement} The "Show More" button element.
 * @example
 * ```javascript
 * const showMoreButton = createShowMoreButton("john_doe");
 * document.getElementById("feed-container").appendChild(showMoreButton);
 * ```
 */
function createShowMoreButton(profileName) {
    const feedContainer = document.getElementById("feed-container");
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add("btn", "btn-primary", "show-more-button");
    showMoreButton.textContent = "Show more";
    feedContainer.appendChild(showMoreButton);
    showMoreButton.addEventListener("click", async () => {
        showMoreButton.remove();
        await renderPosts(profileName, true);
    });

    return showMoreButton;
}
import { getPosts } from "../../API/feed/getposts.mjs";
import { getProfiles } from "../../API/profiles/getprofiles.mjs";
import { renderErrors } from "../../API/ui/rendererrors.mjs";
import { createPostCard } from "../feed/createpostcard.mjs";
import { toggleLoader } from "../shared/toggleLoader.mjs";


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

export async function search(query) {
    const feedContainer = document.getElementById("feed-container");
    const loaderContainer = document.getElementById("loader-container");

    if (!feedContainer) return;

    try {
        toggleLoader(true, loaderContainer);
        const queryParams = new URLSearchParams({
            _author: "true",
            _comments: "true",
            limit: "10",
            q: query,
        });
        const responseProfiles = await getProfiles(query, queryParams);
        const responsePosts = await getPosts(query, queryParams);
        const postsData = responsePosts.data;
        const profileData = responseProfiles.data;
        const searchResults = [...profileData, ...postsData];
        console.log("Search results:", searchResults);
        renderSearchResults(searchResults);

    } catch (error) {
        renderErrors(new Error("Failed to load search results " + error));
        console.error("Error searching posts:", error);
    } finally {
        toggleLoader(false, loaderContainer);
    }
}

// Function to render search results
export function renderSearchResults(searchResults) {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = "";
    searchResults.forEach(result => {
        if (!result.hasOwnProperty("title")) {
            createProfileCard(result, feedContainer);
        } else {
            createPostCard(result, result.author.name, feedContainer); // Pass the author's name as profileName
        }
    });
}

/**
 * Creates a profile card element and appends it to the feed container.
 * @param {Object} profile - The profile object.
 * @param {HTMLElement} feedContainer - The container element for the feed.
 * @example
 * ```javascript
 * const profile = { name: "john_doe", bio: "Profile bio", avatar: { url: "avatar_url", alt: "avatar_alt" }, ... };
 * createProfileCard(profile, document.getElementById("feed-container"));
 * ```
 */
export function createProfileCard(profile, feedContainer) {
    const profileCard = document.createElement("div");
    profileCard.classList.add("card", "bg-white", "rounded-3", "flex-grow-1", "flex-sm-grow-0", "feed-profile-card", "card-custom");

    const profileName = capitalizeFirstLetter(profile.name);
    const profileBio = profile.bio ? profile.bio.replace(/\n/g, '<br>') : '';

    profileCard.innerHTML = `
        <div class="card-body d-flex flex-column">
            <div class="card-header">
                <a href="../profile/index.html?profile=${profile.name}" class="text-decoration-none profile-link">
                    <div class="d-flex column-gap-3 profile-card-header-userinformation" role="button">
                        <div class="profile-image">
                            <img src="${profile.avatar.url}" alt="${profile.avatar.alt}" width="64" height="64">
                        </div>
                        <div class="profileheader-username">
                            <h2>${profileName}</h2>
                            <small class="text-body-secondary">${profileBio}</small>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    `;

    feedContainer.appendChild(profileCard);
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
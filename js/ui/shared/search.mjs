import { getPosts } from "../../API/feed/getposts.mjs";
import { getProfiles } from "../../API/profiles/getprofiles.mjs";
import { renderErrors } from "../../API/ui/rendererrors.mjs";
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
        const responseProfiles = await getProfiles(true, queryParams);
        const responsePosts = await getPosts(undefined, queryParams, true);
        const postsData = responsePosts.data;
        const profileData = responseProfiles.data;
        console.log("Posts data:", postsData);
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

    const searchResultsHeader = document.createElement("h1");
    searchResultsHeader.classList.add("mb-4", "text-center", "text-primary");
    searchResultsHeader.textContent = "Search Results";
    feedContainer.appendChild(searchResultsHeader);

    const profilesList = document.createElement("div");
    profilesList.classList.add("profiles-list", "mb-4");

    const postsList = document.createElement("div");
    postsList.classList.add("posts-list", "mb-4");

    const profiles = searchResults.filter(result => !result.hasOwnProperty("title"));
    const posts = searchResults.filter(result => result.hasOwnProperty("title"));

    if (profiles.length > 0) {
        const profilesHeader = document.createElement("h2");
        profilesHeader.classList.add("mb-3", "text-primary");
        profilesHeader.textContent = "Profiles";
        profilesList.appendChild(profilesHeader);

        profiles.forEach(profile => {
            const profileItem = createProfileListItem(profile);
            profilesList.appendChild(profileItem);
        });

        feedContainer.appendChild(profilesList);
    }

    if (posts.length > 0) {
        const postsHeader = document.createElement("h2");
        postsHeader.classList.add("mb-3", "text-primary");
        postsHeader.textContent = "Posts";
        postsList.appendChild(postsHeader);

        posts.forEach(post => {
            const postItem = createPostListItem(post);
            postsList.appendChild(postItem);
        });

        feedContainer.appendChild(postsList);
    }
}

// Function to create a profile list item
function createProfileListItem(profile) {
    const { name, bio, avatar } = profile;

    const profileItem = document.createElement("div");
    profileItem.classList.add("profile-list-item", "card", "mb-3", "p-3", "shadow-sm");

    const profileName = capitalizeFirstLetter(name);
    const profileBio = bio ? bio.replace(/\n/g, '<br>') : '';

    profileItem.innerHTML = `
        <div class="profile-item-content">
            <a href="../profile/index.html?profile=${name}" class="text-decoration-none profile-link">
                <div class="d-flex align-items-center">
                    <div class="profile-image me-3">
                        <img src="${avatar.url}" alt="${avatar.alt}" class="rounded-circle" width="64" height="64">
                    </div>
                    <div>
                        <h5 class="mb-1">${profileName}</h5>
                        <p class="mb-0 text-muted">${profileBio}</p>
                    </div>
                </div>
            </a>
        </div>
    `;

    return profileItem;
}

// Function to create a post list item
function createPostListItem(post) {
    const postItem = document.createElement("div");
    postItem.classList.add("post-list-item", "card", "mb-3", "p-3", "shadow-sm");

    const { author, title, body, created } = post;

    if (!author) {
        console.error("Post author is undefined:", post);
        return postItem;
    }

    const formattedDate = new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false
    });

    const authorName = capitalizeFirstLetter(author.name);
    const postTitle = capitalizeFirstLetter(title);

    // Replace newline characters with <br> elements
    const formattedBody = body.replace(/\n/g, '<br>');

    postItem.innerHTML = `
        <div class="post-item-content">
            <h5 class="mb-1">${postTitle}</h5>
            <h6 class="mb-2 text-muted">${authorName}</h6>
            <p class="mb-2">${formattedBody}</p>
            <p class="mb-0 text-muted"><small>${formattedDate}</small></p>
        </div>
    `;

    return postItem;
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
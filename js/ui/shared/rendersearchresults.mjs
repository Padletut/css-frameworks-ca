import { createPostCard } from "../feed/createpostcard.mjs";
import { getPost } from "../../API/feed/getpost.mjs";
import { renderErrors } from "./rendererrors.mjs";

/**
 * Renders the search results to the feed container.
 * @param {Array<Object>} searchResults - The search results to render.
 * @example
 * ```javascript
 * const searchResults = [{ name: "john_doe", bio: "Hello, I'm John Doe.", avatar: { url: "https://via.placeholder.com/150", alt: "John Doe" } }];
 * renderSearchResults(searchResults);
 * ```
 **/
export function renderSearchResults(searchResults) {
    const feedContainer = document.getElementById("feed-container");
    feedContainer.innerHTML = "";

    const feedprofile = document.querySelector(".feed-profile");
    if (feedprofile) {
        feedprofile.style.transform = "none";
        feedprofile.style.left = "0";
    }

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
            postItem.addEventListener("click", () => openPostModal(post.id));
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
    const formattedBody = body ? body.replace(/\n/g, '<br>') : '';

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

// Function to open a modal and display the post
async function openPostModal(postId) {
    try {
        const post = await getPost(postId);
        const modalHtml = `
            <div class="modal fade" id="postModal" tabindex="-1" aria-labelledby="postModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="postModalLabel">Post Details</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body" id="postModalBody">
                            <!-- Post content will be injected here -->
                        </div>
                    </div>
                </div>
            </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
        const postModal = new bootstrap.Modal(document.getElementById('postModal'));
        postModal.show();

        const modalBody = document.getElementById('postModalBody');
        modalBody.innerHTML = ""; // Clear previous content

        createPostCard(post, post.author.name, modalBody);
    } catch (error) {
        renderErrors(new Error("Failed to fetch post " + error));
        console.error("Error fetching post:", error);
    }
}

// Function to capitalize the first letter of a string
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
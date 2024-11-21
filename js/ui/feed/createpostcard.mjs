import { initializeCommentModal } from "../bootstrap/initializecommentmodal.mjs";
import { postCheckOwner } from "../../API/feed/postcheckowner.mjs";

/**
 * Creates a post card element and appends it to the feed container.
 * @param {Object} post - The post object.
 * @param {string} profileName - The name of the profile.
 * @param {HTMLElement} feedContainer - The container element for the feed.
 * @example
 * ```javascript
 * const post = { author: { name: "john_doe" }, title: "Post Title", body: "Post content", ... };
 * createPostCard(post, "john_doe", document.getElementById("feed-container"));
 * ```
 */
export function createPostCard(post, profileName, feedContainer) {
    const { author, title, body, media, tags, reactions, comments, created } = post;

    const postCard = document.createElement("div");
    postCard.classList.add("card", "bg-white", "rounded-3", "flex-grow-1", "flex-sm-grow-0", "feed-post-card", "card-custom");

    const formattedDate = new Date(created).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "2-digit",
    });

    const authorName = capitalizeFirstLetter(author.name);
    const postTitle = capitalizeFirstLetter(title);

    postCard.innerHTML = `
        <div class="card-body d-flex flex-column">
            <div class="card-header">
                <a href="../profile/index.html?profile=${authorName}" class="text-decoration-none post-profile-link">
                    <div class="d-flex column-gap-3 post-card-header-userinformation" role="button">
                        <div class="post-profile-image">
                            <img src="${author.avatar.url}" alt="${author.avatar.alt}" width="64" height="64">
                        </div>
                        <div class="postheader-username">
                            <h2>${authorName}</h2>
                            <small class="text-body-secondary">Posted on ${formattedDate}</small>
                        </div>
                    </div>
                </a>
            </div>
            <div class="card-main">
                <div class="card-title">
                    <h3>${postTitle}</h3>
                </div>
                <div class="card-text">
                    <p>${body}</p>
                    ${media ? `<img src="${media.url}" alt="${media.alt}" width="100%">` : ''}
                </div>
                <div class="card-tags mt-3">
                    ${tags.map(tag => `<span class="badge bg-secondary" role="button">${tag}</span>`).join('')}
                </div>
                <div class="card-comments mt-3 collapse" id="comments-${post.id}">
                    ${comments.map(comment => `
                        <div class="comment">
                            <p><strong>${comment.author.name}:</strong> ${comment.body}</p>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="card-footer d-flex p-1 pt-3 column-gap-5" role="button">
                <div class="d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                    <i class="bi bi-hand-thumbs-up-fill"></i><small class="text-body-secondary">Like (${reactions.length})</small>
                </div>
                <div class="comment-open-modal-button d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                    <i class="bi bi-chat-left-dots-fill"></i><small class="text-body-secondary">Comments (${comments.length})</small>
                </div>
            </div>
        </div>
    `;

    feedContainer.appendChild(postCard);

    const commentButton = postCard.querySelector('.comment-open-modal-button');
    if (commentButton) {
        commentButton.addEventListener('click', () => initializeCommentModal(post));
    }

    if (postCheckOwner(author.name)) {
        addEditDeleteButtons(postCard, post, profileName);
    }
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 * @example
 * ```javascript
 * const capitalized = capitalizeFirstLetter("john");
 * console.log(capitalized); // "John"
 * ```
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

/**
 * Adds edit and delete buttons to a post card.
 * @param {HTMLElement} postCard - The post card element.
 * @param {Object} post - The post object.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const postCard = document.createElement("div");
 * const post = { id: 123, ... };
 * addEditDeleteButtons(postCard, post, "john_doe");
 * ```
 */
function addEditDeleteButtons(postCard, post, profileName) {
    const cardFooter = postCard.querySelector('.card-footer');

    const editButton = document.createElement("div");
    editButton.classList.add("d-flex", "align-items-center", "column-gap-2", "text-body-secondary", "icon-link-hover", "edit-button");
    editButton.innerHTML = `<i class="bi bi-pencil-fill"></i><small class="text-body-secondary">Edit</small>`;
    editButton.addEventListener('click', () => initializeUpdatePostModal(post, profileName));

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("d-flex", "align-items-center", "column-gap-2", "text-body-secondary", "icon-link-hover", "delete-button");
    deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i><small class="text-body-secondary">Delete</small>`;
    deleteButton.addEventListener('click', () => deletePost(post.id, profileName));

    cardFooter.appendChild(editButton);
    cardFooter.appendChild(deleteButton);
}
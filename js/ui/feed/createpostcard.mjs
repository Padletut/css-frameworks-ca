import { initializeCommentModal } from "../bootstrap/initializecommentmodal.mjs";
import { postCheckOwner } from "../../API/feed/postcheckowner.mjs";
import { reactToPost } from "./reacttopost.mjs";
import { getPost } from "../../API/feed/getpost.mjs";
import { capitalizeFirstLetter } from "../shared/capitalizefirstletter.mjs";
import { splitName } from "../shared/splitname.mjs";
import { addEditDeleteButtons } from "../shared/addeditdeletebuttons.mjs";
import { formatDate } from "../shared/formatdate.mjs";


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

    const { author, title, body, media, tags, comments, _count: { reactions: reactionsCounter, comments: commentsCounter }, created } = post;
    const postCard = document.createElement("div");
    postCard.classList.add("card", "bg-white", "rounded-3", "flex-grow-1", "flex-sm-grow-0", "feed-post-card", "card-custom");

    const formattedDate = formatDate(created);

    let authorName = splitName(author.name);
    authorName = capitalizeFirstLetter(authorName);
    const postTitle = capitalizeFirstLetter(title);

    // Replace newline characters with <br> elements
    const formattedBody = body ? body.replace(/\n/g, '<br>') : '';

    postCard.innerHTML = `
        <div class="card-body d-flex flex-column">
            <div class="card-header">
                <a href="../profile/index.html?profile=${author.name}" class="text-decoration-none post-profile-link">
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
                    <p>${formattedBody}</p>
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
            <div class="card-footer d-flex flex-wrap p-1 pt-3 column-gap-5">
                <div class="react-button d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                    <i class="bi bi-hand-thumbs-up-fill"></i><small class="text-body-secondary like-counter">Like (${reactionsCounter})</small>
                </div>
                <div class="comment-open-modal-button d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                    <i class="bi bi-chat-left-dots-fill"></i><small class="text-body-secondary comments-counter">Comments (${commentsCounter})</small>
                </div>
            </div>
        </div>
    `;

    feedContainer.appendChild(postCard);

    const commentButton = postCard.querySelector(".comment-open-modal-button");
    const commentsCounterElement = postCard.querySelector(".comments-counter");
    if (commentButton) {
        commentButton.addEventListener("click", () => {
            getPost(post.id)
                .then(post => {
                    initializeCommentModal(post, commentsCounterElement);
                });
        });
    }

    if (postCheckOwner(author.name)) {
        addEditDeleteButtons(postCard, post, profileName);
    }

    const reactButton = postCard.querySelector(".react-button");
    const likeCounterElement = postCard.querySelector(".like-counter");
    if (reactButton) {
        reactButton.addEventListener("click", () => reactToPost(post.id, "👍", likeCounterElement));
    }
}
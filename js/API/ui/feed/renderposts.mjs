import { getPosts } from "../../feed/getposts.mjs";
import { initializeCommentModal } from "../../../ui/bootstrap/initializecommentmodal.mjs";

let nextPage;
let isLastPage = false;

export async function renderPosts() {
    const feedContainer = document.getElementById("feed-container");
    if (feedContainer) {
        try {
            if (!nextPage) {
                nextPage = 1;
            }
            const posts = await getPosts(nextPage);
            nextPage = posts.meta.nextPage;

            if (!Array.isArray(posts.data)) {
                throw new Error("Posts data is not an array");
            }

            posts.data.forEach((post) => {

                // Destructure the post object
                const { author, title, body, media, tags, reactions, comments, created } = post;

                const postCard = document.createElement("div");
                postCard.classList.add("card", "bg-white", "rounded-3", "flex-grow-1", "flex-sm-grow-0", "feed-post-card", "card-custom");

                // Format the date
                const postDate = new Date(created);
                const formattedDate = postDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                });

                // Capitalize the first letter of the author's name
                const authorName = capitalizeFirstLetter(author.name);

                // Capitalize the first letter of the title
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
                        </div>
                        <div class="card-footer d-flex p-1 pt-3 column-gap-5" role="button">
                            <div class="d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover">
                                <i class="bi bi-hand-thumbs-up-fill"></i><small class="text-body-secondary">Like (${reactions.length})</small>
                            </div>
                            <div class="comment-open-modal-button d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                                <i class="bi bi-chat-left-dots-fill"></i><small class="text-body-secondary">Comments (${comments.length})</small>
                            </div>
                        </div>
                    </div>
                `;

                // Append the post card to the feed container
                feedContainer.appendChild(postCard);

                // Handle comment modal buttons
                const commentButton = postCard.querySelector('.comment-open-modal-button');
                if (commentButton) {
                    commentButton.addEventListener('click', function () {
                        initializeCommentModal(post);
                    });
                }
            });
        } catch (error) {
            console.error("Error rendering posts:", error);
        }
    }
    if (!isLastPage) {
        createShowMoreButton();
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function createShowMoreButton() {
    const feedContainer = document.getElementById("feed-container");
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add("btn", "btn-primary", "show-more-button");
    showMoreButton.textContent = "Show more";
    feedContainer.appendChild(showMoreButton);
    showMoreButton.addEventListener("click", async function () {
        showMoreButton.remove();
        await renderPosts();

    });

    return showMoreButton;
}
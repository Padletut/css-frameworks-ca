import { getPosts } from "../../feed/getposts.mjs";

export async function renderPosts() {
    const feedContainer = document.getElementById("feed-container");
    if (feedContainer) {
        try {
            const posts = await getPosts();
            console.log("Posts data:", posts);

            if (!Array.isArray(posts.data)) {
                throw new Error("Posts data is not an array");
            }

            posts.data.forEach((post) => {
                const postCard = document.createElement("div");
                postCard.classList.add("card", "bg-white", "rounded-3", "flex-grow-1", "flex-sm-grow-0", "feed-post-card", "card-custom");

                // Format the date
                const postDate = new Date(post.created);
                const formattedDate = postDate.toLocaleDateString("en-US", {
                    year: "numeric",
                    month: "long",
                    day: "2-digit",
                });

                postCard.innerHTML = `
                    <div class="card-body d-flex flex-column">
                        <div class="card-header">
                            <a href="../profile/index.html?profile=${post.author.name}" class="text-decoration-none post-profile-link">
                                <div class="d-flex column-gap-3 post-card-header-userinformation" role="button">
                                    <div class="post-profile-image">
                                        <img src="images/profilepictureplaceholder.svg" alt="image" width="64" height="64">
                                    </div>
                                    <div class="postheader-username">
                                        <h2>${post.author.name}</h2>
                                        <small class="text-body-secondary">Posted on ${formattedDate}</small>
                                    </div>
                                </div>
                            </a>
                        </div>
                        <div class="card-main">
                            <div class="card-title">
                                <h3>${post.title}</h3>
                            </div>
                            <div class="card-text">
                                <p>${post.body}</p>
                                ${post.media ? `<img src="${post.media.url}" alt="${post.media.alt}" width="100%">` : ''}
                            </div>
                            <div class="card-tags mt-3">
                                ${post.tags.map(tag => `<span class="badge bg-secondary" role="button">${tag}</span>`).join('')}
                            </div>
                        </div>
                        <div class="card-footer d-flex p-1 pt-3 column-gap-5" role="button">
                            <div class="d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover">
                                <i class="bi bi-hand-thumbs-up-fill"></i><small class="text-body-secondary">Like (${post.reactions.length})</small>
                            </div>
                            <div id="commentOpenModalButton" class="d-flex align-items-center column-gap-2 text-body-secondary icon-link-hover" role="button">
                                <i class="bi bi-chat-left-dots-fill"></i><small class="text-body-secondary">Comments (${post.comments.length})</small>
                            </div>
                        </div>
                    </div>
                `;

                // Append the post card to the feed container
                feedContainer.appendChild(postCard);
            });
        } catch (error) {
            console.error("Error rendering posts:", error);
        }
    }
}
import { initializeUpdatePostModal } from "../bootstrap/initializecreatepostmodal.mjs";
import { deletePost } from "../../API/feed/deletepost.mjs";
import { fetchPosts } from "./fetchposts.mjs";
import { createPostCard } from "./createpostcard.mjs";

let nextPage;
let isLastPage = false;

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
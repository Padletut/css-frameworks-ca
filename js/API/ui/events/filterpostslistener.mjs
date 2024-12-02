import { renderErrors } from "../rendererrors.mjs";
import { fetchPosts } from "../../../ui/feed/fetchposts.mjs";
import { createPostCard } from "../../../ui/feed/createpostcard.mjs";
import { renderPosts } from "../../../ui/feed/renderposts.mjs";
import { searchFormListener } from "./searchformlistener.mjs";

export function filterPostsListener(profileName = null, feedContainer) {

    const filterDropdown = document.getElementById('filterDropdown');
    const dropdownItems = document.querySelectorAll('.dropdown-item');
    const searchForm = document.querySelector('.search-form');
    let selectedTags = null;

    dropdownItems.forEach(item => {
        item.addEventListener('click', async (event) => {
            event.preventDefault();
            const tagsAttribute = event.target.getAttribute('data-tag');
            const filterText = event.target.textContent.trim();
            selectedTags = tagsAttribute ? tagsAttribute.split(',') : null;
            let allPosts = [];

            if (selectedTags) {
                try {

                    // Fetch posts for each tag, since the API does not support multiple tags
                    for (const tag of selectedTags) {
                        const response = await fetchPosts(profileName, tag);
                        if (response && response.data) {
                            allPosts = [...allPosts, ...response.data];
                        }
                    }

                    const searchInput = document.querySelector('input[type="search"]');
                    const query = searchInput ? searchInput.value : null;

                    // Event listener for search form
                    searchFormListener(query, selectedTags);


                    // Remove duplicates
                    const uniquePosts = Array.from(new Set(allPosts.map(post => post.id)))
                        .map(id => allPosts.find(post => post.id === id));

                    // Render unique posts
                    feedContainer.innerHTML = "";
                    uniquePosts.forEach(post => createPostCard(post, profileName, feedContainer));
                } catch (error) {
                    renderErrors("Failed to load posts " + error);
                    console.error("Error rendering posts:", error);
                }
            } else {
                renderPosts(profileName);
            }
            filterDropdown.textContent = filterText;
        });
    });
}
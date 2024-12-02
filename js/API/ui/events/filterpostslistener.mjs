import { renderErrors } from "../rendererrors.mjs";
import { fetchPosts } from "../../../ui/feed/fetchposts.mjs";
import { createPostCard } from "../../../ui/feed/createpostcard.mjs";
import { renderPosts } from "../../../ui/feed/renderposts.mjs";
import { fetchSearch } from "../../../ui/shared/search.mjs";

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

    if (searchForm) {
        searchForm.addEventListener('submit', async (event) => {
            event.preventDefault();
            const query = event.target.querySelector('input[type="search"]').value;

            if (selectedTags) {
                try {
                    await fetchSearch(query, ...selectedTags);
                } catch (error) {
                    renderErrors(new Error("Failed to load search results"));
                    console.error("Error searching posts:", error);
                }
            } else {
                await fetchSearch(query);
            }
        });
    }
}
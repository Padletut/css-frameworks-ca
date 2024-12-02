import { fetchPosts } from "../feed/fetchposts.mjs";
import { createPostCard } from "../feed/createpostcard.mjs";
import { renderErrors } from "../../API/ui/rendererrors.mjs";
import { renderPosts } from "../feed/renderposts.mjs";

/**
 * Filters posts based on the selected tags.
 * @param {string} profileName - The name of the profile.
 * @param {Array<string>} selectedTags - The selected tags to filter posts by.
 * @param {HTMLElement} feedContainer - The container to render the posts in.
 * @param {HTMLElement} filterDropdown - The dropdown element to update the text.
 * @param {string} filterText - The text to update the dropdown with.
 * @returns {Promise<void>}
 */
export async function filterPosts(profileName, selectedTags, feedContainer, filterDropdown, filterText) {
    let allPosts = [];

    if (selectedTags) {
        try {
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
}
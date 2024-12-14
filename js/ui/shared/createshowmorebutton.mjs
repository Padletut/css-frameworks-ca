/**
 * Creates a "Show More" button to load additional posts.
 * @param {string} profileName - The name of the profile.
 * @returns {HTMLButtonElement} The "Show More" button element.
 * @example
 * ```javascript
 * const showMoreButton = createShowMoreButton("john_doe");
 * document.getElementById("feed-container").appendChild(showMoreButton);
 * ```
 */
/*export function createShowMoreButton(profileName) {
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
}*/

/**
 * Creates a "Show More" button to load additional posts.
 * @param {Function} fetchNextPage - The callback function to fetch the next page of posts.
 * @returns {HTMLButtonElement} The "Show More" button element.
 * @example
 * ```javascript
 * const showMoreButton = createShowMoreButton(fetchNextPage);
 * document.getElementById("feed-container").appendChild(showMoreButton);
 * ```
 */
export function createShowMoreButton(fetchNextPage) {
    const feedContainer = document.getElementById("feed-container");
    const showMoreButton = document.createElement("button");
    showMoreButton.classList.add("btn", "btn-primary", "show-more-button");
    showMoreButton.textContent = "Show more";
    feedContainer.appendChild(showMoreButton);
    showMoreButton.addEventListener("click", async () => {
        showMoreButton.remove();
        await fetchNextPage();
    });

    return showMoreButton;
}
import { setupFollowing } from "../events/setupFollowing.mjs";

/**
 * Renders the Following of a profile.
 * @param {Object} profile - The profile object.
 * @returns {Promise<void>} A promise that resolves when the Following are rendered.
 * @example
 * ```javascript
 * await renderFollowing(profile);
 * ```
 */
export async function renderFollowing(profile) {
    try {
        const followingList = profile.following;

        const followingContainer = document.querySelector(".following .list-group");
        followingContainer.innerHTML = ""; // Clear existing Following

        followingList.forEach(following => {
            const followingItem = document.createElement("li");
            followingItem.classList.add("list-group-item", "d-flex", "align-items-center");

            const followingContent = `
                <div class="d-flex align-items-center" role="button">
                    <img src="${following.avatar.url || '../feed/images/profilepictureplaceholder.svg'}" alt="${following.avatar.alt}" width="32" height="32" class="me-2">
                    ${following.name}
                </div>
            `;

            followingItem.innerHTML = followingContent;
            followingContainer.appendChild(followingItem);
            setupFollowing();
        });
    } catch (error) {
        console.error("Error rendering Following:", error);
    }
}
import { setupFollowers } from "../events/setupfollowers.mjs";

/**
 * Renders the followers of a profile.
 * @param {Object} profile - The profile object.
 * @returns {Promise<void>} A promise that resolves when the followers are rendered.
 * @example
 * ```javascript
 * await renderFollowers(profile);
 * ```
 */
export async function renderFollowers(profile) {
    try {
        const followersList = profile.followers;

        const followersContainer = document.querySelector(".followers .list-group");
        followersContainer.innerHTML = ""; // Clear existing followers

        followersList.forEach(follower => {
            const followerItem = document.createElement("li");
            followerItem.classList.add("list-group-item", "d-flex", "align-items-center");

            const followerContent = `
                <div class="d-flex align-items-center" role="button">
                    <img src="${follower.avatar.url || '../feed/images/profilepictureplaceholder.svg'}" alt="${follower.avatar.alt}" width="32" height="32" class="me-2">
                    ${follower.name}
                </div>
            `;

            followerItem.innerHTML = followerContent;
            followersContainer.appendChild(followerItem);
            setupFollowers();
        });
    } catch (error) {
        console.error("Error rendering followers:", error);
    }
}
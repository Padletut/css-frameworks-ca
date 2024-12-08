import { splitName } from "../shared/splitname.mjs";

/**
 * Renders the Following of a profile.
 * @memberof module:Profile
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

        const followingSection = document.querySelector(".following");
        const followingContainer = followingSection.querySelector(".list-group");
        if (!followingSection || !followingContainer) {
            console.error("Following section or container not found");
            return;
        }

        if (followingList.length === 0) {
            followingSection.classList.add("hidden");
        } else {
            followingSection.classList.remove("hidden");
            followingContainer.innerHTML = ""; // Clear existing Following

            followingList.forEach(following => {
                const followingItem = document.createElement("li");
                followingItem.classList.add("list-group-item", "d-flex", "align-items-center");

                const followingContent = `
                    <div class="d-flex align-items-center" role="button">
                        <img src="${following.avatar.url || '../feed/images/profilepictureplaceholder.svg'}" alt="${following.avatar.alt}" width="32" height="32" class="me-2">
                        ${splitName(following.name)}
                    </div>
                `;

                followingItem.innerHTML = followingContent;
                followingItem.querySelector('div[role="button"]').addEventListener('click', () => {
                    window.location.href = `index.html?profile=${following.name}`;
                });

                followingContainer.appendChild(followingItem);
            });
        }
    } catch (error) {
        console.error("Error rendering Following:", error);
    }
}


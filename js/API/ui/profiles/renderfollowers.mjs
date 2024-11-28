/**
 * Renders the followers of a profile.
 * @memberof module:Profile
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

        const followersSection = document.querySelector(".followers");
        const followersContainer = followersSection.querySelector(".list-group");
        if (!followersSection || !followersContainer) {
            console.error("Followers section or container not found");
            return;
        }

        if (followersList.length === 0) {
            followersSection.classList.add("hidden");
        } else {
            followersSection.classList.remove("hidden");
            followersContainer.innerHTML = ""; // Clear existing followers

            followersList.forEach(follower => {
                const followerItem = document.createElement("li");
                followerItem.classList.add("list-group-item", "d-flex", "align-items-center");

                const followerContent = `
                    <div class="d-flex align-items-center" role="button">
                        <img src="${follower.avatar.url || '../feed/images/profilepictureplaceholder.svg'}" alt="${follower.avatar.alt}" width="32" height="32" class="me-2">
                        ${splitName(follower.name)}
                    </div>
                `;

                followerItem.innerHTML = followerContent;
                followerItem.querySelector('div[role="button"]').addEventListener('click', () => {
                    window.location.href = `index.html?profile=${follower.name}`;
                });
                followersContainer.appendChild(followerItem);
            });
        }
    } catch (error) {
        console.error("Error rendering followers:", error);
    }
}

function splitName(name) {
    return name.split("_").join(" ");
}
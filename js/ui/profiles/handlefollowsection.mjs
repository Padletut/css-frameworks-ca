import { renderFollowing } from "./renderfollowing.mjs";
import { renderFollowers } from "./renderfollowers.mjs";

// Function to remove section .follow-section if there are no followers or following

/**
 * Handles the follow section of a profile.
 * @param {Object} profile - The profile object.
 * @returns {Promise<void>} A promise that resolves when the follow section is handled.
 * @example
 * ```javascript
 * await handleFollowSection(profile);
 * ```
 */
export async function handleFollowSection(profile) {
    try {
        const followSection = document.querySelectorAll(".follow-section");
        if (!followSection) {
            console.error("Follow section not found");
            return;
        }

        if (profile.followers.length === 0 && profile.following.length === 0) {
            followSection.forEach(section => {
                section.remove();
            });
        } else {
            await renderFollowers(profile);
            await renderFollowing(profile);
        }
    } catch (error) {
        console.error("Error handling follow section:", error);
    }
}
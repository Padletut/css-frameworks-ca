import { openModal } from "./openmodal.mjs";

/**
 * Initializes the create post modal.
 * @param {Object} post - The post object (optional).
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const post = { title: "Sample Post", body: "Post content" };
 * const profileName = "john_doe";
 * initializeCreatePostModal(post, profileName);
 * ```
 */
export function initializeCreatePostModal(post, profileName) {
    // Handle create new post modal
    const openPostModalButton = document.getElementById("openPostModalButton");
    if (openPostModalButton) {
        openPostModalButton.addEventListener("click", function (event) {
            event.preventDefault();
            openModal("create", null, profileName);
        });
    }
}
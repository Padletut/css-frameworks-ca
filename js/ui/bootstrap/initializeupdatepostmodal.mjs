import { openModal } from "./openmodal.mjs";

/**
 * Initializes the update post modal.
 * @param {Object} post - The post object.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const post = { id: 123, title: "Sample Post", body: "Post content" };
 * const profileName = "john_doe";
 * initializeUpdatePostModal(post, profileName);
 * ```
 */
export function initializeUpdatePostModal(post, profileName) {

    // Handle update post modal    
    openModal("update", post, profileName);
}
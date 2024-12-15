import { loadHTML } from "../loadhtml.mjs";
import { initializeCreatePostModal } from "./initializecreatepostmodal.mjs";
/**
 * Loads the modals for creating posts and comments.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const profileName = "john_doe";
 * loadModals(profileName);
 * ```
 */
export function loadModals(profileName) {
    // Load modals
    const modalsContainer = document.getElementById("modals-container");
    if (modalsContainer) {
        loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal(null, profileName));
        loadHTML('../modals/commentmodal.html', 'modals-container');
    }
}
import * as global from "../../constants.mjs";
import { feedProfileFetch } from "../../fetch/fetch.mjs";
import { headers } from "../../headers.mjs";
import { saveStorage } from "../../../storage/savestorage.mjs";

const { API_BASE_URL, API_PROFILES } = global;

/**
 * Generic function to handle profile updates.
 * @param {Object} profile - The profile object.
 * @param {Object} updatedProfile - The updated profile data.
 * @param {string} modalId - The ID of the modal to hide.
 * @param {string} formId - The ID of the form to validate.
 * @returns {Promise<void>} A promise that resolves when the profile update is complete.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" } };
 * const updatedProfile = { bio: "New bio" };
 * await handleProfileUpdate(profile, updatedProfile, "editBioModal", "editBioForm");
 * ```
 */
export async function handleProfileUpdate(profile, updatedProfile, modalId, formId) {
    const { name } = profile.data;

    try {
        const response = await feedProfileFetch(`${API_BASE_URL}${API_PROFILES}/${name}`, {
            method: 'PUT',
            headers: headers(true),
            body: JSON.stringify(updatedProfile)
        });

        if (response.ok) {
            // Update the profile in local storage
            const updatedProfileData = await response.json();
            saveStorage("profile", updatedProfileData);

            // Hide the modal
            const modal = bootstrap.Modal.getInstance(document.getElementById(modalId));
            modal.hide();
            document.getElementById(modalId).remove();

            // Reload the page to reflect the changes
            window.location.reload();
        } else {
            throw new Error('Failed to update profile');
        }
    } catch (error) {
        console.error('Error updating profile:', error);
    }
}
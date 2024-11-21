import { editProfileAvatarAndBio } from "../profiles/editprofileavatarandbio.mjs";
import { editProfileBanner } from "../profiles/editprofilebanner.mjs";

/**
 * Sets up event listeners for edit buttons.
 * @param {Object} profile - The profile object.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" } };
 * setupEditButtons(profile);
 * ```
 */
export function setupEditButtons(profile) {
    const editCoverButton = document.querySelector('[name="edit-cover"]');
    const editProfileButton = document.querySelector('[name="edit-profile"]');

    if (editCoverButton) {
        editCoverButton.addEventListener("click", async () => {
            await editProfileBanner(profile);
        });
    }

    if (editProfileButton) {
        editProfileButton.addEventListener("click", async () => {
            await editProfileAvatarAndBio(profile);
        });
    }
}
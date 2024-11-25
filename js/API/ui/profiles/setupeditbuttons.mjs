import { editProfileAvatarAndBio } from "../profiles/editprofileavatarandbio.mjs";
import { editProfileBanner } from "../profiles/editprofilebanner.mjs";
import { checkProfileOwner } from "../../../API/profiles/profilecheckowner.mjs";

/**
 * Sets up event listeners for edit buttons.
 * @memberof module:Profile
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
    const isOwner = checkProfileOwner(profile);

    if (!isOwner) {
        if (editCoverButton) {
            editCoverButton.remove();
        }
        if (editProfileButton) {
            editProfileButton.remove();
        }
        return;
    } else {
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
}
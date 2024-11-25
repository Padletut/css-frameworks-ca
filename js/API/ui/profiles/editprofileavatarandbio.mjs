import { loadStorage } from "../../../storage/loadstorage.mjs";
import { handleProfileUpdate } from "./handleprofileupdate.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Function to edit avatar URL and bio.
 * @memberof module:Profile
 * @param {Object} [profile=loggedInUser] - The profile object.
 * @returns {Promise<void>} A promise that resolves when the profile avatar and bio update is complete.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" }, avatar: { url: "https://example.com/avatar.jpg" }, bio: "New bio" };
 * await editProfileAvatarAndBio(profile);
 * ```
 */
export async function editProfileAvatarAndBio(profile = loggedInUser) {
    // Ensure the avatar and bio properties exist and provide default values if they do not
    const { avatar: { url: avatarUrl = '' } = {}, bio = '' } = profile || {};

    // Create and show the Bootstrap modal
    const modalHtml = `
        <div class="modal fade" id="editAvatarBioModal" tabindex="-1" aria-labelledby="editAvatarBioModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editAvatarBioModalLabel">Edit Profile Avatar and Bio</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editAvatarBioForm" class="needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="avatarUrl" class="form-label">Avatar URL</label>
                                <input type="url" class="form-control" id="avatarUrl" value="${avatarUrl}" required>
                                <div class="invalid-feedback">Please provide a valid URL.</div>
                            </div>
                            <div class="mb-3">
                                <label for="bio" class="form-label">Bio</label>
                                <textarea class="form-control" id="bio" rows="3" required>${bio}</textarea>
                                <div class="invalid-feedback">Please provide a bio.</div>
                            </div>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const editAvatarBioModal = new bootstrap.Modal(document.getElementById('editAvatarBioModal'));
    editAvatarBioModal.show();

    // Handle form submission
    document.getElementById('editAvatarBioForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const avatarUrl = document.getElementById('avatarUrl').value;
        const bio = document.getElementById('bio').value;

        const updatedProfile = {
            avatar: {
                url: avatarUrl,
                alt: `Avatar for profile ${profile.name}` // Set a default alt text
            },
            bio: bio
        };

        await handleProfileUpdate(profile, updatedProfile, 'editAvatarBioModal', 'editAvatarBioForm');
    });
}
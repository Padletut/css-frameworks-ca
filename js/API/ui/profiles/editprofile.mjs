import * as global from "../../constants.mjs";
import { feedProfileFetch } from "../../fetch/fetch.mjs";
import { headers } from "../../headers.mjs";
import { loadStorage } from "../../../storage/loadstorage.mjs";
import { saveStorage } from "../../../storage/savestorage.mjs";

const { API_BASE_URL, API_PROFILES } = global;
const loggedInUser = loadStorage("profile");

/**
 * Generic function to handle profile updates.
 * @param {Object} profile - The profile object.
 * @param {Object} updatedProfile - The updated profile data.
 * @param {string} modalId - The ID of the modal to hide.
 * @param {string} formId - The ID of the form to validate.
 */
async function handleProfileUpdate(profile, updatedProfile, modalId, formId) {
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

/**
 * Function to edit a profile banner.
 * @param {Object} [profile=loggedInUser] - The profile object.
 */
export async function editProfileBanner(profile = loggedInUser) {
    // Ensure the banner property exists and provide default values if it does not
    const bannerUrl = profile.banner?.url || '';

    // Create and show the Bootstrap modal
    const modalHtml = `
        <div class="modal fade" id="editBannerModal" tabindex="-1" aria-labelledby="editBannerModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="editBannerModalLabel">Edit Profile Banner</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        <form id="editBannerForm" class="needs-validation" novalidate>
                            <div class="mb-3">
                                <label for="bannerUrl" class="form-label">Banner URL</label>
                                <input type="url" class="form-control" id="bannerUrl" value="${bannerUrl}" required>
                                <div class="invalid-feedback">Please provide a valid URL.</div>
                            </div>
                            <button type="submit" class="btn btn-primary">Save changes</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    `;
    document.body.insertAdjacentHTML('beforeend', modalHtml);
    const editBannerModal = new bootstrap.Modal(document.getElementById('editBannerModal'));
    editBannerModal.show();

    // Handle form submission
    document.getElementById('editBannerForm').addEventListener('submit', async function (event) {
        event.preventDefault();
        const form = event.target;
        if (!form.checkValidity()) {
            form.classList.add('was-validated');
            return;
        }

        const bannerUrl = document.getElementById('bannerUrl').value;

        const updatedProfile = {
            banner: {
                url: bannerUrl,
                alt: `Banner for profile ${profile.data.name}` // Set a default alt text
            }
        };

        await handleProfileUpdate(profile, updatedProfile, 'editBannerModal', 'editBannerForm');
    });
}

/**
 * Function to edit avatar URL and bio.
 * @param {Object} [profile=loggedInUser] - The profile object.
 */
export async function editProfileAvatarAndBio(profile = loggedInUser) {
    // Ensure the avatar and bio properties exist and provide default values if they do not
    const avatarUrl = profile.avatar?.url || '';
    const bio = profile.bio || '';

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
                alt: `Avatar for profile ${profile.data.name}` // Set a default alt text
            },
            bio: bio
        };

        await handleProfileUpdate(profile, updatedProfile, 'editAvatarBioModal', 'editAvatarBioForm');
    });
}
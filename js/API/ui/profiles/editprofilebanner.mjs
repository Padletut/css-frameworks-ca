import * as global from "../../constants.mjs";
import { loadStorage } from "../../../storage/loadstorage.mjs";
import { handleProfileUpdate } from "./handleprofileupdate.mjs";

const { API_BASE_URL, API_PROFILES } = global;
const loggedInUser = loadStorage("profile");

/**
 * Function to edit a profile banner.
 * @memberof module:Profile
 * @param {Object} [profile=loggedInUser] - The profile object.
 * @returns {Promise<void>} A promise that resolves when the profile banner update is complete.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" }, banner: { url: "https://example.com/banner.jpg" } };
 * await editProfileBanner(profile);
 * ```
 */
export async function editProfileBanner(profile = loggedInUser) {
    // Ensure the banner property exists and provide default values if it does not
    const { banner: { url: bannerUrl = '' } = {} } = profile || {};

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
                alt: `Banner for profile ${profile.name}` // Set a default alt text
            }
        };

        await handleProfileUpdate(profile, updatedProfile, 'editBannerModal', 'editBannerForm');
    });
}
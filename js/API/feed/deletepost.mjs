import * as global from "../constants.mjs";
import { headers } from "../headers.mjs";
import { handleErrors } from "../utils/handleerrors.mjs";
import { renderPosts } from "../../ui/feed/renderposts.mjs";

const { API_BASE_URL, API_POSTS } = global;

/**
 * Deletes a post after asking for confirmation using a Bootstrap 5 modal and re-renders the posts.
 * @param {number} postId - The ID of the post to delete.
 * @param {string} profileName - The name of the profile to re-render posts for.
 * @returns {Promise<void>} A promise that resolves when the post is deleted and the posts are re-rendered.
 * @example
 * ```javascript
 * const postId = 123;
 * const profileName = "john_doe";
 * await deletePost(postId, profileName);
 * ```
 */
export async function deletePost(postId, profileName) {
    // Create the modal HTML
    const modalHtml = `
        <div class="modal fade" id="confirmDeleteModal" tabindex="-1" aria-labelledby="confirmDeleteModalLabel" aria-hidden="true">
            <div class="modal-dialog">
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="confirmDeleteModalLabel">Confirm Delete</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div class="modal-body">
                        Are you sure you want to delete this post?
                    </div>
                    <div class="modal-footer">
                        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                        <button type="button" class="btn btn-danger" id="confirmDeleteButton">Delete</button>
                    </div>
                </div>
            </div>
        </div>
    `;

    // Append the modal to the body
    document.body.insertAdjacentHTML('beforeend', modalHtml);

    // Initialize the modal
    const modalElement = document.getElementById('confirmDeleteModal');
    const modal = new bootstrap.Modal(modalElement);
    const confirmButton = document.getElementById('confirmDeleteButton');

    return new Promise((resolve, reject) => {
        confirmButton.onclick = async () => {
            modal.hide();
            try {
                const response = await fetch(API_BASE_URL + API_POSTS + "/" + postId, {
                    headers: headers(true),
                    method: "DELETE"
                });

                if (response.ok) {
                    await renderPosts(profileName); // Re-render posts with profileName
                    resolve();
                } else {
                    await handleErrors(response);
                    reject(new Error('Failed to delete post'));
                }
            } catch (error) {
                reject(error);
            } finally {
                // Remove the modal from the DOM
                modalElement.remove();
            }
        };

        modal.show();
    });
}
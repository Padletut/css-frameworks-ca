import { addComment } from "../API/feed/addcomment.mjs";
import { deleteComment } from "../API/feed/deletecomment.mjs";
import { loadStorage } from "../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Handles the edit functionality for comments.
 * @param {HTMLElement} commentsSection - The container element for the comments.
 * @param {number} postId - The ID of the post.
 * @example
 * ```javascript
 * const commentsSection = document.getElementById("comments-section");
 * const postId = 123;
 * handleEdits(commentsSection, postId);
 * ```
 */
export async function handleCommentEdit(commentsSection, postId) {
    const editButtonHandlers = new Map();
    const saveEditButtonHandlers = new Map();

    const initializeEditButtons = () => {
        // Add event listeners to edit buttons
        commentsSection.querySelectorAll('.edit-button').forEach(button => {
            const commentId = button.dataset.commentId;
            const handler = function () {
                const editForm = document.querySelector(`#comment-${commentId} .edit-form`);
                if (editForm) {
                    editForm.classList.toggle('d-none');
                }
            };

            // Remove old event listener if it exists
            if (editButtonHandlers.has(commentId)) {
                button.removeEventListener('click', editButtonHandlers.get(commentId));
            }

            // Add new event listener
            button.addEventListener('click', handler);
            editButtonHandlers.set(commentId, handler);
        });
    };

    const initializeEditSaveButtons = () => {
        // Add event listeners to save edit buttons
        commentsSection.querySelectorAll('.save-edit-button').forEach(button => {
            const commentId = Number(button.dataset.commentId); // Convert to number
            const handler = async function (event) {
                event.preventDefault();
                const replyToId = button.dataset.replyToId ? Number(button.dataset.replyToId) : null; // Convert to number or null
                const editForm = document.querySelector(`#comment-${commentId} .edit-form`);
                const editText = editForm.querySelector('.edit-text').value;

                // Trigger validation
                if (!editForm.querySelector('.edit-text').checkValidity()) {
                    editForm.querySelector('.edit-text').classList.add('is-invalid');
                    return;
                }

                if (editText) {
                    // Delete the existing comment without confirmation
                    await deleteComment(postId, commentId, true);
                    // Add the new comment with the updated content and original replyToId
                    const newComment = await addComment(postId, editText, replyToId);
                    editForm.classList.add('d-none');

                    // Update edit form, reply button, edit button and delete button data-comment-id attribute to the new comment ID
                    const currentCommentForm = document.querySelector(`#comment-${commentId}`);
                    const currentEditButton = document.querySelector(`#comment-${commentId} .edit-button`);
                    const currentReplyButton = document.querySelector(`#comment-${commentId} .reply-button`);
                    const currentSubmitReplyButton = document.querySelector(`#comment-${commentId} .submit-reply-button`);
                    const currentDeleteButton = document.querySelector(`#comment-${commentId} .delete-button`);
                    const currentSaveEditButton = document.querySelector(`#comment-${commentId} .save-edit-button`);
                    currentCommentForm.id = `comment-${newComment.data.id}`;
                    currentEditButton.dataset.commentId = newComment.data.id;
                    currentReplyButton.dataset.commentId = newComment.data.id;
                    currentSubmitReplyButton.dataset.commentId = newComment.data.id;
                    currentDeleteButton.dataset.commentId = newComment.data.id;
                    currentSaveEditButton.dataset.commentId = newComment.data.id;

                    // Update the comment text in the UI
                    const commentText = currentCommentForm.querySelector('p');
                    commentText.innerHTML = `<strong>${loggedInUser.name}:</strong> ${editText}`;

                    // Reinitialize event listeners for the new comment
                    initializeEditButtons();
                    initializeEditSaveButtons();
                }
            };

            // Remove old event listener if it exists
            if (saveEditButtonHandlers.has(commentId)) {
                button.removeEventListener('click', saveEditButtonHandlers.get(commentId));
            }

            // Add new event listener
            button.addEventListener('click', handler);
            saveEditButtonHandlers.set(commentId, handler);
        });
    };

    // Initialize event listeners
    initializeEditButtons();
    initializeEditSaveButtons();
}
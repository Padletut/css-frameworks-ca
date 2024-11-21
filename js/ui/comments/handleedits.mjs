import { addComment } from "../../API/feed/addcomment.mjs";
import { deleteComment } from "../../API/feed/deletecomment.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

export function handleEdits(commentsSection, postId) {
    // Add event listeners to edit buttons
    commentsSection.querySelectorAll('.edit-button').forEach(button => {
        button.addEventListener('click', function () {
            const commentId = button.dataset.commentId;
            const editForm = document.querySelector(`#comment-${commentId} .edit-form`);
            editForm.classList.toggle('d-none');
        });
    });

    // Add event listeners to save edit buttons
    commentsSection.querySelectorAll('.save-edit-button').forEach(button => {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const commentId = Number(button.dataset.commentId); // Convert to number
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

                // Update the comment text in the UI
                const commentElement = document.querySelector(`#comment-${commentId}`);
                commentElement.id = `comment-${newComment.id}`;
                const commentText = commentElement.querySelector('p');
                commentText.innerHTML = `<strong>${loggedInUser.name}:</strong> ${editText}`;
                editForm.classList.add('d-none');
            }
        });
    });
}
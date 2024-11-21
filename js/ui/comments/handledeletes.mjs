import { deleteComment } from "../../API/feed/deletecomment.mjs";

/**
 * Handles the delete functionality for comments.
 * @param {HTMLElement} commentsSection - The container element for the comments.
 * @param {number} postId - The ID of the post.
 * @example
 * ```javascript
 * const commentsSection = document.getElementById("comments-section");
 * const postId = 123;
 * handleDeletes(commentsSection, postId);
 * ```
 */
export function handleDeletes(commentsSection, postId) {
    // Add event listeners to delete buttons
    commentsSection.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async function () {
            const commentId = Number(button.dataset.commentId); // Convert to number
            await deleteComment(postId, commentId);
            // Remove the comment from the UI
            const commentElement = document.querySelector(`#comment-${commentId}`);
            if (commentElement) {
                commentElement.remove();
            }
        });
    });
}
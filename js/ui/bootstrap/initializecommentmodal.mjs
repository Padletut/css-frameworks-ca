import { renderComments } from "../comments/rendercomments.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { handleCommentReply } from "../../comments/handlecommentreply.mjs";
import { handleCommentEdit } from "../../comments/handlecommentedit.mjs";
import { handleDeletes } from "../../comments/handledeletes.mjs";
import { handleAddComment } from "../../comments/handleaddcomment.mjs";
import { renderErrors } from "../shared/rendererrors.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Initializes the comment modal for a given post.
 * @param {Object} post - The post object containing comments.
 * @param {HTMLElement} commentsCounterElement - The element displaying the number of comments.
 * @example
 * ```javascript
 * const post = { id: 1, title: "Sample Post", comments: [...] };
 * initializeCommentModal(post);
 * ```
 */
export function initializeCommentModal(post, commentsCounterElement) {

    // Handle comment modal
    const commentModalElement = document.getElementById("commentModal");
    if (commentModalElement) {
        const commentModal = new bootstrap.Modal(commentModalElement);

        // Store the post ID in a data attribute on the modal element
        commentModalElement.dataset.postId = post.id;

        // Populate the modal with post data if needed
        const modalTitle = commentModalElement.querySelector(".modal-title");
        if (modalTitle) {
            modalTitle.textContent = `Comments for ${post.title}`;
        }

        // Process comments and replies
        const commentsMap = new Map();
        post.comments.forEach(comment => {
            if (comment.replyToId === null) {
                commentsMap.set(comment.id, { ...comment, replies: [] });
            } else {
                if (commentsMap.has(comment.replyToId)) {
                    commentsMap.get(comment.replyToId).replies.push(comment);
                } else {
                    commentsMap.set(comment.replyToId, { replies: [comment] });
                }
            }
        });

        // Populate the comments section
        const commentsSection = commentModalElement.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.innerHTML = renderComments(Array.from(commentsMap.values()), post.author.name);

            // Handle add, replies, edits, and deletes
            handleCommentReply(commentsSection, post.id);
            handleCommentEdit(commentsSection, post.id);
            handleDeletes(commentsSection, post.id);
        }

        const submitButton = commentModalElement.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener("click", async function (event) {
                event.preventDefault();

                // Handle adding a comment
                await handleAddComment(commentsSection, post.id, commentsCounterElement);
            });
        }

        // Reset validation state when modal is hidden
        commentModalElement.addEventListener('hidden.bs.modal', function () {
            const form = commentModalElement.querySelector('.needs-validation');
            if (form) {
                form.classList.remove('was-validated');
                form.reset();
            }
        });

        // Show the modal
        commentModal.show();
    } else {
        renderErrors('Comment modal element not found');
        console.error('Comment modal element not found');
    }
}
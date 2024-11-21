import { validateInputs } from "./validateinputs.mjs";
import { addComment } from "../../API/feed/addcomment.mjs";
import { renderComments } from "../comments/rendercomments.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";
import { handleReplies } from "../comments/handlereplies.mjs";
import { handleEdits } from "../comments/handleedits.mjs";
import { handleDeletes } from "../comments/handledeletes.mjs";

const loggedInUser = loadStorage("profile");

export function initializeCommentModal(post) {
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

        // Log the processed comments and replies
        console.log("Processed comments and replies:", Array.from(commentsMap.values()));

        // Populate the comments section
        const commentsSection = commentModalElement.querySelector('.comments-section');
        if (commentsSection) {
            commentsSection.innerHTML = renderComments(Array.from(commentsMap.values()), post.owner);

            // Handle replies, edits, and deletes
            handleReplies(commentsSection, post.id);
            handleEdits(commentsSection, post.id);
            handleDeletes(commentsSection, post.id);
        }

        const submitButton = commentModalElement.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener("click", async function (event) {
                event.preventDefault();
                const form = commentModalElement.querySelector('.needs-validation');
                if (!form.checkValidity()) {
                    form.classList.add('was-validated');
                    return;
                }

                if (validateInputs(form)) {
                    // Retrieve the post ID from the data attribute
                    const postId = commentModalElement.dataset.postId;

                    // Add the comment to the correct post
                    const formData = new FormData(form);
                    const comment = formData.get("comment");
                    await addComment(postId, comment);

                    // Re-render comments
                    commentsSection.innerHTML += `
                        <div class="comment mb-3">
                            <p class="mb-0"><strong>You:</strong> ${comment}</p>
                        </div>
                    `;

                    commentModal.hide();
                }
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
        console.error('Comment modal element not found');
    }
}
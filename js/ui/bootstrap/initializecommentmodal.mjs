import { validateInputs } from "./validateinputs.mjs";
import { addComment } from "../../API/feed/addcomment.mjs";
import { deleteComment } from "../../API/feed/deletecomment.mjs";
import { loadStorage } from "../../storage/loadstorage.mjs";

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

function renderComments(comments, postOwner, isTopLevel = true) {
    return comments.map(comment => {
        if (!comment.author) {
            return ''; // Skip rendering if author is not defined
        }
        return `
            <div class="comment mb-3" id="comment-${comment.id}">
                <p class="mb-0"><strong>${comment.author.name}:</strong> ${comment.body}</p>
                ${isTopLevel ? `
                <button class="btn btn-link reply-button mb-2" data-comment-id="${comment.id}">Reply</button>
                <div class="reply-form d-none mb-3">
                    <textarea class="form-control reply-text mb-2" placeholder="Write your reply here..." required></textarea>
                    <div class="invalid-feedback">Please write a reply.</div>
                    <button class="btn btn-primary submit-reply-button" data-comment-id="${comment.id}">Submit Reply</button>
                </div>
                ` : ''}
                ${comment.owner === loggedInUser.name ? `
                <button class="btn btn-link edit-button mb-2" data-comment-id="${comment.id}">Edit</button>
                <div class="edit-form d-none mb-3">
                    <textarea class="form-control edit-text mb-2" placeholder="Edit your comment..." required>${comment.body}</textarea>
                    <div class="invalid-feedback">Please write a comment.</div>
                    <button class="btn btn-primary save-edit-button" data-comment-id="${comment.id}" data-reply-to-id="${comment.replyToId}">Save</button>
                </div>
                <button class="btn btn-link delete-button mb-2" data-comment-id="${comment.id}">Delete</button>
                ` : ''}
                <div class="replies ms-4">
                    ${comment.replies ? renderComments(comment.replies, postOwner, false) : ''}
                </div>
            </div>
        `;
    }).join('');
}

function handleReplies(commentsSection, postId) {
    // Add event listeners to reply buttons
    commentsSection.querySelectorAll('.reply-button').forEach(button => {
        button.addEventListener('click', function () {
            const commentId = button.dataset.commentId;
            const replyForm = document.querySelector(`#comment-${commentId} .reply-form`);
            replyForm.classList.toggle('d-none');
        });
    });

    // Add event listeners to submit reply buttons
    commentsSection.querySelectorAll('.submit-reply-button').forEach(button => {
        button.addEventListener('click', async function (event) {
            event.preventDefault();
            const commentId = Number(button.dataset.commentId); // Convert to number
            const replyForm = document.querySelector(`#comment-${commentId} .reply-form`);
            const replyText = replyForm.querySelector('.reply-text').value;

            // Trigger validation
            if (!replyForm.querySelector('.reply-text').checkValidity()) {
                replyForm.querySelector('.reply-text').classList.add('is-invalid');
                return;
            }

            if (replyText) {
                await addComment(postId, replyText, commentId);
                // Re-render comments or update the UI as needed
                const repliesContainer = document.querySelector(`#comment-${commentId} .replies`);
                repliesContainer.innerHTML += `
                    <div class="reply ms-4 mt-2">
                        <p class="mb-0"><strong>You:</strong> ${replyText}</p>
                    </div>
                `;
                replyForm.querySelector('.reply-text').classList.remove('is-invalid');
                replyForm.querySelector('.reply-text').value = '';
            }
        });
    });
}

function handleEdits(commentsSection, postId) {
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

function handleDeletes(commentsSection, postId) {
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
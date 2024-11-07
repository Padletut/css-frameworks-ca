import { validateInputs } from "./validateinputs.mjs";

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

        const submitButton = commentModalElement.querySelector('button[type="submit"]');
        if (submitButton) {
            submitButton.addEventListener("click", function (event) {
                event.preventDefault();
                const form = commentModalElement.querySelector('.needs-validation');
                if (validateInputs(form)) {
                    // Retrieve the post ID from the data attribute
                    const postId = commentModalElement.dataset.postId;
                    console.log("Adding comment to post ID:", postId);

                    // TODO: Add the comment to the correct post
                    // addCommentToPost(postId, form);

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
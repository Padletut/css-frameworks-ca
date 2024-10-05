import { validateInputs } from "./validateinputs.mjs";

export function initializeCommentModal() {
    // Handle comment modal
    const openCommentModalButton = document.getElementById("commentOpenModalButton");
    if (openCommentModalButton) {
        openCommentModalButton.addEventListener("click", function (event) {
            event.preventDefault();
            const commentModalElement = document.getElementById("commentModal");
            if (commentModalElement) {
                const commentModal = new bootstrap.Modal(commentModalElement);
                commentModal.show();
                const submitButton = commentModalElement.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.addEventListener("click", function (event) {
                        event.preventDefault();
                        const form = commentModalElement.querySelector('.needs-validation');
                        if (validateInputs(form)) {
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
            } else {
                console.error('Comment modal element not found');
            }
        });
    }
}
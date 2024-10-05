import { validateInputs } from "./validateinputs.mjs";

export function initializeCreatePostModal() {
    // Handle create new post modal
    const openPostModalButton = document.getElementById("openPostModalButton");
    if (openPostModalButton) {
        openPostModalButton.addEventListener("click", function (event) {
            event.preventDefault();
            const createNewPostModalElement = document.getElementById("createPostModal");
            if (createNewPostModalElement) {
                const createNewPostModal = new bootstrap.Modal(createNewPostModalElement);
                createNewPostModal.show();
                const submitButton = createNewPostModalElement.querySelector('button[type="submit"]');
                if (submitButton) {
                    submitButton.addEventListener("click", function (event) {
                        event.preventDefault();
                        const form = createNewPostModalElement.querySelector('.needs-validation');
                        if (validateInputs(form)) {
                            createNewPostModal.hide();
                        }
                    });
                }
                // Reset validation state when modal is hidden
                createNewPostModalElement.addEventListener('hidden.bs.modal', function () {
                    const form = createNewPostModalElement.querySelector('.needs-validation');
                    if (form) {
                        form.classList.remove('was-validated');
                        form.reset();
                    }
                });
            } else {
                console.error('Post modal element not found');
            }
        });
    }
}
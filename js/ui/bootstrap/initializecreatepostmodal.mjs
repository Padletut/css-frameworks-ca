import { validateInputs } from "./validateinputs.mjs";
import { createPost } from "../../API/feed/createPost.mjs";

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
                            const formData = new FormData(form);
                            const title = formData.get("title");
                            const content = formData.get("postText");
                            const tags = formData.get("tags") ? formData.get("tags").split(",").map(tag => tag.trim()) : [];
                            const imageUrl = formData.get("imageUrl");

                            let media = null;
                            if (imageUrl) {
                                media = {
                                    url: imageUrl,
                                    alt: title
                                };
                            }

                            createPost(title, content, tags, media).then(() => {
                                createNewPostModal.hide();
                            });

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
import { validateInputs } from "./validateinputs.mjs";
import { createPost } from "../../API/feed/createPost.mjs";
import { updatePost } from "../../API/feed/updatepost.mjs";
import { renderPosts } from "../../API/ui/feed/renderposts.mjs";

export function initializeCreatePostModal(post, profileName) {
    // Handle create new post modal
    const openPostModalButton = document.getElementById("openPostModalButton");
    if (openPostModalButton) {
        openPostModalButton.addEventListener("click", function (event) {
            event.preventDefault();
            openModal("create", null, profileName);
        });
    }
}

export function initializeUpdatePostModal(post, profileName) {

    // Handle update post modal    
    openModal("update", post, profileName);
}


function openModal(state, post, profileName) {
    const createNewPostModalElement = document.getElementById("createPostModal");
    if (createNewPostModalElement) {
        const createNewPostModal = new bootstrap.Modal(createNewPostModalElement);
        createNewPostModal.show();
        const form = createNewPostModalElement.querySelector('.needs-validation');
        const modalTitle = document.getElementById("modal-title");

        if (modalTitle) {
            modalTitle.textContent = state === "create" ? "Create New Post" : "Edit Post";
        }

        if (form) {
            // Pre-fill the form fields if editing a post
            if (state === "update" && post) {
                form.querySelector("#title").value = post.title;
                form.querySelector("#postText").value = post.body;
                form.querySelector("#tags").value = post.tags.join(", ");
                form.querySelector("#imageUrl").value = post.media.url || "";
            }

            // Remove existing event listener to prevent multiple submissions
            form.removeEventListener("submit", handleSubmit);

            // Add new event listener for form submission
            form.addEventListener("submit", handleSubmit);

            async function handleSubmit(event) {
                event.preventDefault();
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
                    if (state === "create") {
                        await createPost(title, content, tags, media);
                    }
                    if (state === "update") {
                        const postId = post.id;
                        await updatePost(postId, title, content, tags, media);
                    }
                    createNewPostModal.hide();
                    await renderPosts(profileName); // Re-render posts with profileName
                }
            }

            // Reset validation state when modal is hidden
            createNewPostModalElement.addEventListener('hidden.bs.modal', function () {
                form.classList.remove('was-validated');
                form.reset();
                // Remove the event listener to prevent multiple submissions
                form.removeEventListener("submit", handleSubmit);
            });
        } else {
            console.error('Form element not found');
        }
    } else {
        console.error('Post modal element not found');
    }
}
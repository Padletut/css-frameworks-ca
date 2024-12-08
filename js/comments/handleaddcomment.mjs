import { addComment } from "../API/feed/addcomment.mjs";
import { renderComments } from "../ui/comments/rendercomments.mjs";
import { getPost } from "../API/feed/getpost.mjs";
import { loadStorage } from "../storage/loadstorage.mjs";
import { validateInputs } from "../ui/bootstrap/validateinputs.mjs";
import { renderErrors } from "../ui/shared/rendererrors.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Handles adding a comment to a post and updating the UI.
 * @param {HTMLElement} commentsSection - The container element for the comments.
 * @param {number} postId - The ID of the post.
 * @param {HTMLElement} commentsCounterElement - The element displaying the comments counter.
 * @example
 * ```javascript
 * const commentsSection = document.getElementById("comments-section");
 * const postId = 123;
 * const commentsCounterElement = document.querySelector(".comments-counter");
 * handleAddComment(commentsSection, postId, commentsCounterElement);
 * ```
 */
export async function handleAddComment(commentsSection, postId, commentsCounterElement) {
    const form = document.querySelector(".comment-form");
    if (!form) {
        renderErrors("Form element not found in comments section");
        return;
    }

    // Trigger Bootstrap validation
    form.classList.add('was-validated');

    if (validateInputs(form)) {
        const comment = form.comment.value;
        if (comment) {
            try {
                // Add the comment to the post
                const newComment = await addComment(postId, comment);

                // Fetch the updated post data
                const { comments } = await getPost(postId);

                // Update the comments section with the new comment
                const commentsMap = new Map();
                comments.forEach(comment => {
                    commentsMap.set(comment.id, { ...comment, replies: [] });
                });

                // Refresh the comments section
                commentsSection.innerHTML = renderComments(Array.from(commentsMap.values()), name);

                // Update comment counter element
                const commentsCounter = commentsMap.size;
                if (commentsCounterElement) {
                    commentsCounterElement.textContent = `Comments (${commentsCounter})`;
                }

                // Clear the form
                form.reset();
                form.classList.remove('was-validated');
            } catch (error) {
                renderErrors("Failed to add comment or fetch updated post data");
                console.error(error);
            }
        } else {
            renderErrors("Comment value is empty");
        }
    } else {
        renderErrors("Form inputs are invalid");
    }
}
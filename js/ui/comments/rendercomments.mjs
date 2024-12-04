import { loadStorage } from "../../storage/loadstorage.mjs";
import { toggleLoader } from "../shared/toggleLoader.mjs";
import { capitalizeFirstLetter } from "../shared/capitalizefirstletter.mjs";
import { formatDate } from "../shared/formatdate.mjs";

const loggedInUser = loadStorage("profile");

/**
 * Renders comments for a given post.
 * @param {Array} comments - An array of comment objects.
 * @param {string} postOwner - The owner of the post.
 * @returns {string} The HTML string for the rendered comments.
 * @example
 * ```javascript
 * const comments = [{ id: 1, body: "Sample comment", replies: [] }];
 * const postOwner = "john_doe";
 * const commentsHTML = renderComments(comments, postOwner);
 * ```
 */
export function renderComments(comments, postOwner, isTopLevel = true) {

    const loaderContainer = document.getElementById("comment-loader-container");
    toggleLoader(true, loaderContainer);

    // Sort comments by creation date
    comments.sort((a, b) => new Date(a.created) - new Date(b.created));

    const commentsHTML = comments.map(comment => {
        if (!comment.author) {
            return ''; // Skip rendering if author is not defined
        }

        const formattedDate = formatDate(comment.created);

        // Capitalize the first letter of the author's name
        const authorName = capitalizeFirstLetter(comment.author.name);

        return `
            <div class="comment mb-3" id="comment-${comment.id}">
                <small class="text-muted">${formattedDate}</small>
                <p class="mb-0"><strong>${authorName}:</strong> ${comment.body}</p>
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

    toggleLoader(false, loaderContainer);
    return commentsHTML;
}
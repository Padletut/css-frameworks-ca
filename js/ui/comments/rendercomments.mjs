import { loadStorage } from "../../storage/loadstorage.mjs";

const loggedInUser = loadStorage("profile");

export function renderComments(comments, postOwner, isTopLevel = true) {
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
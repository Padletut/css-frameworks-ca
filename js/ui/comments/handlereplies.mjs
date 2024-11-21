import { addComment } from '../../API/feed/addcomment.mjs';

export function handleReplies(commentsSection, postId) {
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
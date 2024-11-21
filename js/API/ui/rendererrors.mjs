/**
 * Renders authorization errors as alert messages.
 * @param {Error} error - The error object containing the error message.
 * @example
 * ```javascript
 * try {
 *     // Some code that may throw an error
 * } catch (error) {
 *     renderErrors(error);
 * }
 * ```
 */
export function renderErrors(error) {
    const existingAlert = document.querySelector('.alert');

    if (existingAlert) {
        existingAlert.remove();
    }

    const errorElement = document.createElement('div');
    errorElement.className = 'alert alert-danger alert-dismissible fade show';
    errorElement.role = 'alert';
    errorElement.innerHTML = `
        <div class="alert-message">${error.message}</div>
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;

    document.body.prepend(errorElement);
}
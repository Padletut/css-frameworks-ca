// Function to render authorization errors
export function renderErrors(error) {
    const errorElement = document.createElement("div");
    errorElement.className = "alert alert-danger alert-dismissible fade show";
    errorElement.role = "alert";
    errorElement.innerHTML = `
        ${error.message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    `;
    document.body.prepend(errorElement);
}
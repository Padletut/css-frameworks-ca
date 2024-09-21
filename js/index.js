import { validateInputs } from "./validateinputs.mjs";
import { loadHTML } from "./loadhtml.mjs";

// Load modals
const modalsContainer = document.getElementById("modals-container");
if (modalsContainer) {
    loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal)
    loadHTML('../modals/commentmodal.html', 'modals-container', initializeCommentModal);
}



// Switch between Login and Register account tabs

const signUpLink = document.getElementById("signUpLink");
const signInLink = document.getElementById("signInLink");

if (signUpLink) {
    signUpLink.addEventListener("click", function (event) {
        event.preventDefault();
        const signUpTab = new bootstrap.Tab(document.getElementById("signUp-tab"));
        signUpTab.show();
    });
}

if (signInLink) {
    signInLink.addEventListener("click", function (event) {
        event.preventDefault();
        const signInTab = new bootstrap.Tab(document.getElementById("signIn-tab"));
        signInTab.show();
    });
}

// Eventlistener Sign in and Sign up
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

function handleFormSubmission(buttonElement, formId, redirectUrl) {
    if (buttonElement) {
        buttonElement.addEventListener("click", function (event) {
            event.preventDefault();
            const form = document.getElementById(formId);
            if (validateInputs(form)) {
                setTimeout(() => {
                    form.reset();
                }, 2000);
                window.location.href = redirectUrl;
            } else {
                event.preventDefault();
                event.stopPropagation();
                form.classList.add('was-validated');
            }
        });
    }
}

handleFormSubmission(signInButton, "signInForm", "profile/index.html");
handleFormSubmission(signUpButton, "signUpForm", "profile/index.html");

function initializeCreatePostModal() {
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

function initializeCommentModal() {
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

// Function to calculate and set body padding
function setBodyPadding() {
    const header = document.querySelector('.fixed-top');
    const footer = document.querySelector('footer.fixed-bottom');
    const body = document.body;

    if (header && footer && body) {
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;

        // Set padding for the body
        body.style.paddingTop = `${headerHeight + 30}px`;
        body.style.paddingBottom = `${footerHeight + 30}px`;
    }
}

// Set body padding on initial load and window resize
window.addEventListener('load', setBodyPadding);
window.addEventListener('resize', setBodyPadding);

setBodyPadding();
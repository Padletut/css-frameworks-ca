import { validateInputs } from "./validateinputs.mjs";


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

if (signInButton) {
    signInButton.addEventListener("click", function (event) {
        event.preventDefault();
        const form = document.querySelector('.needs-validation');
        if (form.checkValidity()) {
            window.location.href = "profile/index.html";
        } else {
            form.classList.add('was-validated');
        }
    });
}

if (signUpButton) {
    signUpButton.addEventListener("click", function (event) {
        event.preventDefault();
        validateInputs();
    });
}

// Eventlistener Post page

const postButton = document.getElementById("postButton");
const postModalElement = document.getElementById('createPostModal');

if (postButton) {
    postButton.addEventListener("click", function (event) {
        event.preventDefault();
        if (validateInputs()) {
            const modal = bootstrap.Modal.getInstance(postModalElement);
            modal.hide();
        }
    });
}

if (postModalElement) {
    postModalElement.addEventListener('show.bs.modal', function () {
        const form = postModalElement.querySelector('.needs-validation');
        if (form) {
            form.classList.remove('was-validated');
            form.reset();
        }
    });
}
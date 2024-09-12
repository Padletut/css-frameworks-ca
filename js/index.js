import { validateInputs } from "./validateinputs.mjs";


// Switch between Login and Register account tabs

document.getElementById("signUpLink").addEventListener("click", function (event) {
    event.preventDefault();
    const signUpTab = new bootstrap.Tab(document.getElementById("signUp-tab"));
    signUpTab.show();
});

document.getElementById("signInLink").addEventListener("click", function (event) {
    event.preventDefault();
    const signInTab = new bootstrap.Tab(document.getElementById("signIn-tab"));
    signInTab.show();
});


// Eventlistener Sign in and Sign up

document.getElementById("signInButton").addEventListener("click", function (event) {
    validateInputs();
});

document.getElementById("signUpButton").addEventListener("click", function (event) {
    validateInputs();
});
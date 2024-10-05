import { loadHTML } from "./loadhtml.mjs";
import { authSwitchTabs } from "./ui/bootstrap/authswitchtabs.mjs";
import { handleFormSubmission } from "./ui/bootstrap/handleFormSubsimission.mjs";
import { initializeCreatePostModal } from "./ui/bootstrap/initializecreatepostmodal.mjs";
import { initializeCommentModal } from "./ui/bootstrap/initializecommentmodal.mjs";
import { setBodyPadding } from "./ui/bootstrap/setbodypadding.mjs";

// Load modals
const modalsContainer = document.getElementById("modals-container");
if (modalsContainer) {
    loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal)
    loadHTML('../modals/commentmodal.html', 'modals-container', initializeCommentModal);
}

authSwitchTabs();

// Eventlistener Sign in and Sign up
const signInButton = document.getElementById("signInButton");
const signUpButton = document.getElementById("signUpButton");

handleFormSubmission(signInButton, "signInForm", "profile/index.html");
handleFormSubmission(signUpButton, "signUpForm", "profile/index.html");

// Set body padding on initial load and window resize
window.addEventListener('load', setBodyPadding);
window.addEventListener('resize', setBodyPadding);

setBodyPadding();
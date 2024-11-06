import { loadHTML } from "./ui/loadhtml.mjs";
import { authSwitchTabs } from "./ui/bootstrap/authswitchtabs.mjs";
import { handleFormSubmission } from "./ui/bootstrap/handleFormSubsimission.mjs";
import { initializeCreatePostModal } from "./ui/bootstrap/initializecreatepostmodal.mjs";
import { initializeCommentModal } from "./ui/bootstrap/initializecommentmodal.mjs";
import { setBodyPadding } from "./ui/bootstrap/setbodypadding.mjs";
import { checkAuth } from "./ui/checkauth.mjs";
import { logout } from "./API/auth/logout.mjs";
import { getProfile } from "./API/profiles/getprofile.mjs";
import { getAllProfiles } from "./API/profiles/getallprofiles.mjs";
import { getPosts } from "./API/feed/getposts.mjs";

// Check if user is logged in
checkAuth();

// Load modals
const modalsContainer = document.getElementById("modals-container");
if (modalsContainer) {
    loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal);
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

// Eventlistener for logout button
const logoutButton = document.querySelector(".logout");
if (logoutButton) {
    logoutButton.addEventListener("click", (event) => {
        event.preventDefault();
        logout();
    });
}

// if fetch the profile data

if (document.title === "Profile | ConnectSphere") {
    getProfile();
}

// if <title>Feed | ConnectSphere</title> fetch all prosts
if (document.title === "Feed | ConnectSphere") {
    getPosts();
    getAllProfiles();
}
import { loadHTML } from "./ui/loadhtml.mjs";
import { authSwitchTabs } from "./ui/bootstrap/authswitchtabs.mjs";
import { handleFormSubmission } from "./ui/bootstrap/handleformsubmission.mjs";
import { setBodyPadding } from "./ui/bootstrap/setbodypadding.mjs";
import { checkAuth } from "./ui/checkauth.mjs";
import { logout } from "./API/auth/logout.mjs";
import { initializeCreatePostModal } from "./ui/bootstrap/initializecreatepostmodal.mjs";
import { renderProfile } from "./API/ui/routes/renderprofile.mjs";
import { renderPosts } from "./ui/feed/renderposts.mjs";
import { loadStorage } from "./storage/loadstorage.mjs";
import { fetchSearch } from "./ui/shared/search.mjs";
import { filterPostsListener } from "./API/ui/events/filterpostslistener.mjs";

// Check if user is logged in
let isLoggedIn = checkAuth();

const profileName = loadStorage("profile");

/**
 * Loads the modals for creating posts and comments.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const profileName = "john_doe";
 * loadModals(profileName);
 * ```
 */
function loadModals(profileName) {
    // Load modals
    const modalsContainer = document.getElementById("modals-container");
    if (modalsContainer) {
        loadHTML('../modals/createnewpostmodal.html', 'modals-container', initializeCreatePostModal(null, profileName));
        loadHTML('../modals/commentmodal.html', 'modals-container');
    }
}

if (isLoggedIn && profileName) {
    loadModals(profileName.name);
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

// if <title>Feed | ConnectSphere</title> fetch all prosts
if (document.title === "Feed | ConnectSphere") {
    await renderPosts();
}

// Render profile data
if (document.title === "Profile | ConnectSphere") {
    await renderProfile();
}

// Function to calculate and set the position of .feed-profile
function setFeedProfilePosition() {
    const profileSection = document.querySelector('.profile-card');
    if (profileSection) {
        const feedProfile = document.querySelector('#feed-container');
        const feedContainer = document.querySelector('.feed-profile');

        if (window.innerWidth > 992) {
            const profileSectionRect = profileSection.getBoundingClientRect();
            const widthOffset = 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
            const gapOffset = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
            const feedContainerHeightOffset = 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

            // Apply the calculated positions with offsets
            feedProfile.style.position = 'absolute';
            feedProfile.style.left = `${profileSectionRect.left - (widthOffset / 2)}px`;
            feedProfile.style.top = `${profileSectionRect.bottom + gapOffset + window.scrollY}px`; // Adjust for scroll position
            feedProfile.style.width = `${profileSectionRect.width + widthOffset}px`;
            feedProfile.style.display = 'flex';
            feedProfile.style.flexDirection = 'column';
            const feedProfileRect = feedProfile.getBoundingClientRect();
            feedContainer.style.height = `${feedProfileRect.height + feedContainerHeightOffset}px`;
        } else {
            // Reset to default Bootstrap/SCSS values
            feedProfile.style.position = '';
            feedProfile.style.left = '';
            feedProfile.style.top = '';
            feedProfile.style.width = '';
            feedProfile.style.display = '';
            feedProfile.style.flexDirection = '';
            feedContainer.style.height = '';
        }
    }
}

// Calculate .feed-profile position on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(setFeedProfilePosition, 1000);
});

// Recalculate .feed-profile position on window resize
window.addEventListener('resize', setFeedProfilePosition);

// Recalculate .feed-profile position on scroll
window.addEventListener('scroll', setFeedProfilePosition);
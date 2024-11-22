/**
 * Renders the profile bio in the element with id "profile-bio".
 * @param {Object} profile - The profile object containing bio data.
 * @example
 * ```javascript
 * const profile = { data: { bio: "This is the bio" } };
 * renderProfileBio(profile);
 * ```
 */
export function renderProfileBio(profile) {
    const bioContainer = document.getElementById("profile-bio");
    const bio = document.createElement("p");
    bio.textContent = profile.bio;
    bioContainer.appendChild(bio);
}
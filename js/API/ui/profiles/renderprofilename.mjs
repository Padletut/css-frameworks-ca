/**
 * Renders the profile name in the element with id "profile-id".
 * @memberof module:Profile
 * @param {Object} profileName - The profile object containing name data.
 * @example
 * ```javascript
 * const profile = { data: { name: "john_doe" } };
 * await renderProfileName(profile);
 * ```
 */
export async function renderProfileName(profileName) {
    const profileNameElement = document.getElementById("profile-id");
    if (!profileNameElement) {
        console.error("Profile name element not found");
        return;
    }

    try {
        const profileNameHeading = document.createElement("h2");
        profileNameHeading.classList.add("fw-semibold", "fs-2");
        profileNameHeading.textContent = capitalizeFirstLetter(profileName.name);
        profileNameElement.appendChild(profileNameHeading);

        const smallName = document.createElement("small");
        smallName.classList.add("text-body-secondary");
        smallName.textContent = `@${profileName.name}`;
        profileNameElement.appendChild(smallName);

    } catch (error) {
        console.error(error);
    }
}

/**
 * Capitalizes the first letter of a string.
 * @param {string} string - The string to capitalize.
 * @returns {string} The string with the first letter capitalized.
 * @example
 * ```javascript
 * const capitalized = capitalizeFirstLetter("john");
 * console.log(capitalized); // "John"
 * ```
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
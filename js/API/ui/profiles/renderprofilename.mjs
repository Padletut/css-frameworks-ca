// Renders the profile banner in div with id "profile-cover"
export async function renderProfileName(profileName) {
    const profileNameElement = document.getElementById("profile-id");

    console.log(profileName);
    if (!profileNameElement) {
        console.error("Profile name element not found");
        return;
    }

    try {
        const profileNameHeading = document.createElement("h2");
        profileNameHeading.classList.add("fw-semibold", "fs-2");
        profileNameHeading.textContent = capitalizeFirstLetter(profileName.data.name);
        profileNameElement.appendChild(profileNameHeading);

        const smallName = document.createElement("small");
        smallName.classList.add("text-body-secondary");
        smallName.textContent = `@${profileName.data.name}`;
        profileNameElement.appendChild(smallName);

    } catch (error) {
        console.error(error);
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
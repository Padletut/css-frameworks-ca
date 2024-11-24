/**
 * Sets up the Following list to navigate to the following's profile.
 * @returns {void}
 */
export function setupFollowing() {
    const FollowingContainer = document.querySelector(".following .list-group");

    FollowingContainer.addEventListener("click", async event => {
        if (event.target.tagName === "IMG") {
            const followingName = event.target.nextElementSibling.textContent;
            window.location.href = `index.html?profile=${followingName}`;
        } else if (event.target.tagName === "DIV") {
            const followingName = event.target.textContent;
            window.location.href = `index.html?profile=${followingName}`;
        }
    });
}
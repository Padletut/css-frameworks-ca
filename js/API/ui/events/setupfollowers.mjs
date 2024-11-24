/**
 * Sets up the followers list to navigate to the follower's profile.
 * @returns {void}
 */
export function setupFollowers() {
    const followersContainer = document.querySelector(".followers .list-group");

    followersContainer.addEventListener("click", async event => {
        if (event.target.tagName === "IMG") {
            const followerName = event.target.nextElementSibling.textContent;
            window.location.href = `index.html?profile=${followerName}`;
        } else if (event.target.tagName === "DIV") {
            const followerName = event.target.textContent;
            window.location.href = `index.html?profile=${followerName}`;
        }
    });
}
import { followProfile } from "../profiles/followprofile.mjs";
import { unfollowProfile } from "../profiles/unfollowprofile.mjs";
import { checkIfProfileIsFollowed } from "../../profiles/checkifprofileisfollowed.mjs";
import { loadStorage } from "../../../storage/loadstorage.mjs";
const loggedInUser = loadStorage("profile");

/**
 * Sets up eventlistener for the follow button.
 * @memberof module:Profile
 * @param {Object} profile - The profile object.
 * @example
 * ```javascript
 * const profile = { name: "john_doe" };
 * setupFollowButton(profile);
 * ```
 */
export async function setupFollowButton(profile) {

    const followButton = document.getElementById("btn-check");
    const followLabel = document.querySelector("label[for='btn-check']");

    if (profile.name === loggedInUser.name) {
        followButton.remove();
        followLabel.remove();
        return;
    }



    // Check if the profile is followed and set the button state
    const isFollowed = await checkIfProfileIsFollowed(profile);
    followButton.checked = isFollowed;
    followLabel.textContent = isFollowed ? "Unfollow" : "Follow";

    followButton.addEventListener("change", async () => {
        if (followButton.checked) {
            await followProfile(profile.name);
            followLabel.textContent = "Unfollow";
        } else {
            await unfollowProfile(profile.name);
            followLabel.textContent = "Follow";
        }
    });
}
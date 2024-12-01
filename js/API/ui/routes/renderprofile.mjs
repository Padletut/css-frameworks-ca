import { getProfile } from "../../profiles/getprofile.mjs";
import { renderProfileBanner } from "../profiles/renderprofilebanner.mjs";
import { renderProfileAvatar } from "../profiles/renderprofileavatar.mjs";
import { renderProfileName } from "../profiles/renderprofilename.mjs";
import { renderProfileBio } from "../profiles/renderprofilebio.mjs";
import { renderProfileCounters } from "../profiles/renderprofilecounters.mjs";
import { renderErrors } from "../../ui/rendererrors.mjs";
import { renderPosts } from "../../../ui/feed/renderposts.mjs";
import { setupEditButtons } from "../profiles/setupeditbuttons.mjs";
import { setupFollowButton } from "../profiles/setupfollowbutton.mjs";
import { toggleLoader } from "../../../ui/shared/toggleLoader.mjs";
import { handleFollowSection } from "../profiles/handlefollowsection.mjs";

/**
 * @module Profile
 */

/**
 * Renders the profile page.
 * @memberof module:Profile
 * @returns {Promise<void>} A promise that resolves when the profile page is rendered.
 * @example
 * ```javascript
 * await renderProfile();
 * ```
 */
export async function renderProfile() {
    const urlParams = new URLSearchParams(window.location.search);
    let profileName = urlParams.get("profile");
    if (profileName === null) {
        profileName = undefined;
    }

    const loaderContainer = document.getElementById("loader-container");

    try {
        toggleLoader(true, loaderContainer);
        const { data: profile } = await getProfile(profileName);
        //  if (document.title === "Profile | ConnectSphere") {
        renderProfileBanner(profile);
        renderProfileAvatar(profile);
        renderProfileName(profile);
        renderProfileBio(profile);
        await handleFollowSection(profile);
        await renderPosts(profile.name);
        renderProfileCounters(profile);

        setupEditButtons(profile);
        setupFollowButton(profile);

        //   }
    } catch (error) {
        renderErrors(new Error("An error occurred while loading the profile page"));
        console.error("Error rendering profile data:", error);
    } finally {
        toggleLoader(false, loaderContainer);
    }
}


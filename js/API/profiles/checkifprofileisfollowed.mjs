import { getProfile } from './getprofile.mjs';
import { loadStorage } from '../../storage/loadstorage.mjs';
import { renderErrors } from '../../ui/shared/rendererrors.mjs';

const loggedInUser = loadStorage('profile');

/**
 * Checks if the visited profile is followed.
 * @memberof module:Profile
 * @param {Object} profile - The profile object.
 * @returns {Promise<boolean>} A promise that resolves to true if the profile is followed, false otherwise.
 * @example
 * ```javascript
 * const profile = { name: "john_doe" };
 * const isFollowed = await checkIfProfileIsFollowed(profile);
 * console.log(isFollowed);
 * ```
 */
export async function checkIfProfileIsFollowed(profile) {
    try {
        const { data: { followers } } = await getProfile(profile.name);
        if (followers.some(follower => follower.name === loggedInUser.name)) {
            return true;
        } else {
            return false;
        }
    } catch (error) {
        renderErrors(new Error("An error occurred while checking if profile is followed"));
        console.error("Error checking if profile is followed:", error);
        return false;
    }
}
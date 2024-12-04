/**
 * Renders the counters for following, followers, and posts.
 * @memberof module:Profile
 * @param {Object} profile - The profile object containing the counts.
 * @example
 * ```javascript
 * renderCounters(profile);
 * ```
 */
export async function renderProfileCounters(profile) {
    const followingCounter = document.querySelector(".following-counter");
    const followersCounter = document.querySelector(".followers-counter");
    const postsCounter = document.querySelector(".posts-counter");

    if (followingCounter) {
        followingCounter.innerHTML = `${profile._count.following} <small class="text-body-secondary"> Following</small>`;
    }

    if (followersCounter) {
        followersCounter.innerHTML = `${profile._count.followers} <small class="text-body-secondary"> Followers</small>`;
    }

    if (postsCounter) {
        postsCounter.innerHTML = `${profile._count.posts} <small class="text-body-secondary"> Posts</small>`;
    }
}
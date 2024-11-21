import { getPosts } from "../../API/feed/getposts.mjs";
import { getPostsbyUser } from "../../API/feed/getpostsbyuser.mjs";

let nextPage;
let isLastPage = false;

export async function fetchPosts(profileName) {
    if (!nextPage) nextPage = 1;

    let posts;
    if (!profileName) {
        posts = await getPosts(nextPage);
    } else {
        posts = await getPostsbyUser(profileName, nextPage);
    }

    isLastPage = posts.meta.isLastPage;
    nextPage = posts.meta.nextPage;

    return posts;
}
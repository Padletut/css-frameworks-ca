import { feedProfileFetch } from "../fetch/fetch.mjs";
import * as global from "../constants.mjs";
// Function to create a post
// This function is called when the user submits the form to create a new post

export async function createPost(event) {
    //   event.preventDefault();
    const form = event.target;
    const formData = new FormData(form);
    console.log(formData);
    return;
    const url = `${process.env.API_URL}/posts`;
    const options = {
        method: "POST",
        //    title:
        body: formData,
    };
    try {
        const response = await feedProfileFetch(url, options);
        if (response.ok) {
            form.reset();
            window.location.reload();
        } else {
            throw new Error("Failed to create post");
        }
    } catch (error) {
        console.error(error);
    }
}
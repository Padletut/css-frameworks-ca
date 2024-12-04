import { initializeUpdatePostModal } from "../../ui/bootstrap/initializeupdatepostmodal.mjs";
import { deletePost } from "../../API/feed/deletepost.mjs";

/**
 * Adds edit and delete buttons to a post card.
 * @param {HTMLElement} postCard - The post card element.
 * @param {Object} post - The post object.
 * @param {string} profileName - The name of the profile.
 * @example
 * ```javascript
 * const postCard = document.createElement("div");
 * const post = { id: 123, ... };
 * addEditDeleteButtons(postCard, post, "john_doe");
 * ```
 */
export function addEditDeleteButtons(postCard, post, profileName) {
    const cardFooter = postCard.querySelector('.card-footer');

    const editButton = document.createElement("div");
    editButton.classList.add("d-flex", "align-items-center", "column-gap-2", "text-body-secondary", "icon-link-hover", "edit-button");
    editButton.setAttribute("role", "button");
    editButton.innerHTML = `<i class="bi bi-pencil-fill"></i><small class="text-body-secondary">Edit</small>`;
    editButton.addEventListener('click', () => initializeUpdatePostModal(post, profileName));

    const deleteButton = document.createElement("div");
    deleteButton.classList.add("d-flex", "align-items-center", "column-gap-2", "text-body-secondary", "icon-link-hover", "delete-button");
    deleteButton.setAttribute("role", "button");
    deleteButton.innerHTML = `<i class="bi bi-trash-fill"></i><small class="text-body-secondary">Delete</small>`;
    deleteButton.addEventListener('click', () => deletePost(post.id, profileName));

    cardFooter.appendChild(editButton);
    cardFooter.appendChild(deleteButton);
}
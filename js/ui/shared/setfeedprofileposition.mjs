// Function to calculate and set the position of .feed-profile
export function setFeedProfilePosition() {
    const profileSection = document.querySelector('.profile-card');
    if (profileSection) {
        const feedProfile = document.querySelector('#feed-container');
        const feedContainer = document.querySelector('.feed-profile');

        if (window.innerWidth > 992) {
            const profileSectionRect = profileSection.getBoundingClientRect();
            const widthOffset = 1.5 * parseFloat(getComputedStyle(document.documentElement).fontSize);
            const gapOffset = 3 * parseFloat(getComputedStyle(document.documentElement).fontSize);
            const feedContainerHeightOffset = 2 * parseFloat(getComputedStyle(document.documentElement).fontSize);

            // Apply the calculated positions with offsets
            feedProfile.style.position = 'absolute';
            feedProfile.style.left = `${profileSectionRect.left - (widthOffset / 2)}px`;
            feedProfile.style.top = `${profileSectionRect.bottom + gapOffset + window.scrollY}px`; // Adjust for scroll position
            feedProfile.style.width = `${profileSectionRect.width + widthOffset}px`;
            feedProfile.style.display = 'flex';
            feedProfile.style.flexDirection = 'column';
            const feedProfileRect = feedProfile.getBoundingClientRect();
            feedContainer.style.height = `${feedProfileRect.height + feedContainerHeightOffset}px`;
        } else {
            // Reset to default Bootstrap/SCSS values
            feedProfile.style.position = '';
            feedProfile.style.left = '';
            feedProfile.style.top = '';
            feedProfile.style.width = '';
            feedProfile.style.display = '';
            feedProfile.style.flexDirection = '';
            feedContainer.style.height = '';
        }
    }
}
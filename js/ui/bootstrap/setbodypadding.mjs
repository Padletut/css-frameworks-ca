// Function to calculate and set body padding
export function setBodyPadding() {
    const header = document.querySelector('.fixed-top');
    const footer = document.querySelector('footer.fixed-bottom');
    const body = document.body;

    if (header && footer && body) {
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;

        // Set padding for the body
        body.style.paddingTop = `${headerHeight + 30}px`;
        body.style.paddingBottom = `${footerHeight + 30}px`;
    }
}
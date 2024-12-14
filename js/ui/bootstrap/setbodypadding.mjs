/**
 * Calculates and sets body padding based on the header and footer heights.
 * @example
 * ```javascript
 * setBodyPadding();
 * ```
 */
export function setBodyPadding() {
    const header = document.querySelector('.sticky-top');
    const footer = document.querySelector('footer.fixed-bottom');
    const body = document.body;

    if (header && footer && body) {
        const headerHeight = header.offsetHeight;
        const footerHeight = footer.offsetHeight;

        // Set padding for the body
        //   body.style.paddingTop = `${headerHeight + 30}px`;
        body.style.paddingBottom = `${footerHeight + 30}px`;
    }
}
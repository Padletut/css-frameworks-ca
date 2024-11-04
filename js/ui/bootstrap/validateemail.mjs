// Function to validate if an email input ends with @noroff.no or @stud.noroff.no
export function validateEmail(form, emailInput) {
    const emailPattern = /^[^\s@]+@(noroff\.no|stud\.noroff\.no)$/;
    const isValid = emailPattern.test(emailInput.value);

    if (!isValid) {
        emailInput.setCustomValidity('Sorry, only users with email ending @noroff.no or @stud.noroff.no can register');
    } else {
        emailInput.setCustomValidity('');
    }

    return isValid;
}
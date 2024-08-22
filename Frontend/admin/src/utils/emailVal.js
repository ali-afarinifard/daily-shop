const validateEmail = (email) => {
    // Regex for validating the email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Check if the email format is valid
    if (!emailRegex.test(email)) {
        return 'ایمیل معتبر نیست';
    }

    // Extract the part before @
    const localPart = email.split('@')[0];

    // Check if the local part has at least 3 letters
    const letterCount = (localPart.match(/[a-zA-Z]/g) || []).length;

    if (letterCount < 3) {
        return 'ایمیل باید حداقل 3 حرف قبل از علامت @ داشته باشد';
    }

    return '';
};

export { validateEmail };
const formatPriceToFarsi = (price: number | undefined): string => {
    if (price === undefined) return '';

    // Convert price to a string and remove any existing slashes
    let value = price.toString().replace(/\//g, '');

    // Format the price with slashes (commas for thousands)
    value = value.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Convert formatted price to Farsi numerals
    const farsiDigits = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];
    return value.replace(/\d/g, (digit) => farsiDigits[Number(digit)]);
};

export { formatPriceToFarsi };
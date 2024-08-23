const formatPriceWithSlashes = (price: number | undefined) => {
    // Remove all existing slashes
    let value = price?.toString().replace(/\//g, '');

    // Add slashes after every three digits
    return value?.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export { formatPriceWithSlashes }

// Helper function to format price with commas
export const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

// Helper function to unformat price (remove commas)
export const unformatPrice = (formattedPrice) => {
    return parseInt(formattedPrice.replace(/,/g, ""), 10);
};

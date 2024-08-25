const formatPriceWithSlashes = (price) => {
    if (typeof price === 'number') {
        return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }
    return price.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
};

export {formatPriceWithSlashes}

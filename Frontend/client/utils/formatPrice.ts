export const formatPriceIR = (amount: number) => {
    return new Intl.NumberFormat("fa-IR", {
        style: "currency",
        currency: "IRR",
    }).format(amount);
};


export const formatPrice = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
};
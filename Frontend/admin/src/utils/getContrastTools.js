// Helper function to determine contrast color (black or white)
function getContrastTools(tools) {
    // Convert hex color to RGB
    const r = parseInt(tools.substr(1, 2), 16);
    const g = parseInt(tools.substr(3, 2), 16);
    const b = parseInt(tools.substr(5, 2), 16);

    // Calculate brightness (perceived luminance)
    const brightness = (r * 299 + g * 587 + b * 114) / 1000;

    // Return black for light backgrounds, white for dark backgrounds
    return brightness > 125 ? "black" : "white";
}

export {getContrastTools};
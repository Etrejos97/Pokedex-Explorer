export const formatNumber = (id) => '#' + String(id).padStart(3, '0');

export const capitalize = (text) => text.charAt(0).toUpperCase() + text.slice(1);
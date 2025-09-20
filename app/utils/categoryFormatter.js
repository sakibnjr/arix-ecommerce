/**
 * Formats category internal values to display labels
 * @param {string} category - Internal category value ('normal' or 'drop-shoulder')
 * @returns {string} - Display label ('Classic' or 'Drop Shoulder')
 */
export function formatCategoryLabel(category) {
  switch (category) {
    case 'normal':
      return 'Classic';
    case 'drop-shoulder':
      return 'Drop Shoulder';
    default:
      return category; // Return as-is if unknown
  }
}

/**
 * Gets the internal category value from display label
 * @param {string} label - Display label ('Classic' or 'Drop Shoulder')
 * @returns {string} - Internal value ('normal' or 'drop-shoulder')
 */
export function getCategoryValue(label) {
  switch (label) {
    case 'Classic':
      return 'normal';
    case 'Drop Shoulder':
      return 'drop-shoulder';
    default:
      return label; // Return as-is if unknown
  }
}

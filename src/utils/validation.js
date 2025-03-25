/**
 * Validation utility functions for school-related data
 */

/**
 * Validates school input data
 * @param {Object} data - School data to validate
 * @returns {Object} - Object containing validation result and errors
 */
function validateSchoolInput(data) {
  const errors = [];

  // Check if name is provided and is a string
  if (!data.name || typeof data.name !== 'string' || data.name.trim() === '') {
    errors.push('A valid school name is required');
  }

  // Check if address is provided and is a string
  if (!data.address || typeof data.address !== 'string' || data.address.trim() === '') {
    errors.push('A valid address is required');
  }

  // Check if latitude is provided and is a valid number
  if (data.latitude === undefined || data.latitude === null || isNaN(parseFloat(data.latitude))) {
    errors.push('A valid latitude is required');
  } else {
    // Check latitude range (-90 to 90)
    const lat = parseFloat(data.latitude);
    if (lat < -90 || lat > 90) {
      errors.push('Latitude must be between -90 and 90 degrees');
    }
  }

  // Check if longitude is provided and is a valid number
  if (data.longitude === undefined || data.longitude === null || isNaN(parseFloat(data.longitude))) {
    errors.push('A valid longitude is required');
  } else {
    // Check longitude range (-180 to 180)
    const lon = parseFloat(data.longitude);
    if (lon < -180 || lon > 180) {
      errors.push('Longitude must be between -180 and 180 degrees');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

/**
 * Validates user location input for listing schools
 * @param {Object} data - Location data to validate
 * @returns {Object} - Object containing validation result and errors
 */
function validateLocationInput(data) {
  const errors = [];

  // Check if latitude is provided and is a valid number
  if (data.latitude === undefined || data.latitude === null || isNaN(parseFloat(data.latitude))) {
    errors.push('A valid latitude is required');
  } else {
    // Check latitude range (-90 to 90)
    const lat = parseFloat(data.latitude);
    if (lat < -90 || lat > 90) {
      errors.push('Latitude must be between -90 and 90 degrees');
    }
  }

  // Check if longitude is provided and is a valid number
  if (data.longitude === undefined || data.longitude === null || isNaN(parseFloat(data.longitude))) {
    errors.push('A valid longitude is required');
  } else {
    // Check longitude range (-180 to 180)
    const lon = parseFloat(data.longitude);
    if (lon < -180 || lon > 180) {
      errors.push('Longitude must be between -180 and 180 degrees');
    }
  }

  return {
    isValid: errors.length === 0,
    errors: errors
  };
}

module.exports = {
  validateSchoolInput,
  validateLocationInput
};

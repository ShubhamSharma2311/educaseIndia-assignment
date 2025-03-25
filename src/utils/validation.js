/**
 * Validation utility functions using Zod
 */
const z = require('zod');

// School schema definition
const schoolSchema = z.object({
  name: z.string().min(1, { message: "School name is required" }),
  address: z.string().min(1, { message: "Address is required" }),
  latitude: z.coerce
    .number()
    .min(-90, { message: "Latitude must be between -90 and 90 degrees" })
    .max(90, { message: "Latitude must be between -90 and 90 degrees" }),
  longitude: z.coerce
    .number()
    .min(-180, { message: "Longitude must be between -180 and 180 degrees" })
    .max(180, { message: "Longitude must be between -180 and 180 degrees" })
});

// Location schema definition
const locationSchema = z.object({
  latitude: z.coerce
    .number()
    .min(-90, { message: "Latitude must be between -90 and 90 degrees" })
    .max(90, { message: "Latitude must be between -90 and 90 degrees" }),
  longitude: z.coerce
    .number()
    .min(-180, { message: "Longitude must be between -180 and 180 degrees" })
    .max(180, { message: "Longitude must be between -180 and 180 degrees" })
});

/**
 * Validates school input data
 * @param {Object} data - School data to validate
 * @returns {Object} - Object containing validation result and errors
 */
function validateSchoolInput(data) {
  const result = schoolSchema.safeParse(data);
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
      data: result.data // Returns parsed and type-converted data
    };
  } else {
    return {
      isValid: false,
      errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
    };
  }
}

/**
 * Validates user location input for listing schools
 * @param {Object} data - Location data to validate
 * @returns {Object} - Object containing validation result and errors
 */
function validateLocationInput(data) {
  const result = locationSchema.safeParse(data);
  
  if (result.success) {
    return {
      isValid: true,
      errors: [],
      data: result.data // Returns parsed and type-converted data
    };
  } else {
    return {
      isValid: false,
      errors: result.error.errors.map(err => `${err.path.join('.')}: ${err.message}`)
    };
  }
}

module.exports = {
  validateSchoolInput,
  validateLocationInput
};

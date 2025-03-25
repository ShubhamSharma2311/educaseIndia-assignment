/**
 * School Controller - Handles HTTP requests and responses for school endpoints
 */

const schoolService = require('../services/schoolService');
const { validateSchoolInput, validateLocationInput } = require('../utils/validation');
const { ApiError } = require('../middleware/errorHandler');

/**
 * School controller containing HTTP handlers for school endpoints
 */
const schoolController = {
  /**
   * Add a new school
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async addSchool(req, res, next) {
    try {
      // Validate input data
      const validation = validateSchoolInput(req.body);
      
      if (!validation.isValid) {
        throw ApiError.badRequest('Invalid school data', validation.errors);
      }
      
      // Process the request
      const school = await schoolService.createSchool(req.body);
      
      // Send successful response
      res.status(201).json({
        success: true,
        message: 'School added successfully',
        data: school
      });
    } catch (error) {
      next(error);
    }
  },

  /**
   * List all schools sorted by distance from provided coordinates
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {Function} next - Express next middleware function
   */
  async listSchools(req, res, next) {
    try {
      // Extract location data from query parameters
      const locationData = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
      };
      
      // Validate location data
      const validation = validateLocationInput(locationData);
      
      if (!validation.isValid) {
        throw ApiError.badRequest('Invalid location data', validation.errors);
      }
      
      // Get schools sorted by distance
      const schools = await schoolService.listSchoolsByDistance(
        locationData.latitude,
        locationData.longitude
      );
      
      // Send successful response
      res.status(200).json({
        success: true,
        message: 'Schools retrieved successfully',
        count: schools.length,
        data: schools
      });
    } catch (error) {
      next(error);
    }
  }
};

module.exports = schoolController;

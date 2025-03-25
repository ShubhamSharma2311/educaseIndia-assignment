/**
 * School Controller - Handles HTTP requests and responses for school endpoints
 */

const schoolService = require('../services/schoolServices');
const { validateSchoolInput, validateLocationInput } = require('../utils/validation');
const { ApiError } = require('../middleware/errorHandler');

const schoolController = {
  async addSchool(req, res, next) {
    try {
      const validation = validateSchoolInput(req.body);
      
      if (!validation.isValid) {
        throw ApiError.badRequest('Invalid school data', validation.errors);
      }
      
      const school = await schoolService.createSchool(req.body);
      
      return res.status(201).json({
        success: true,
        message: 'School added successfully',
        data: school
      });
    } catch (error) {
      console.error("Error in addSchool:", error);
      return next(error);
    }
  },

  async listSchools(req, res, next) {
    try {
      const locationData = {
        latitude: req.query.latitude,
        longitude: req.query.longitude
      };
      
      const validation = validateLocationInput(locationData);
      
      if (!validation.isValid) {
        throw ApiError.badRequest('Invalid location data', validation.errors);
      }
      
      const schools = await schoolService.listSchoolsByDistance(
        locationData.latitude,
        locationData.longitude
      );
      
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

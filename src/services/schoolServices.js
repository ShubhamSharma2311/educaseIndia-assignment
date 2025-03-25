/**
 * School service - handles business logic for school operations
 */

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { calculateDistance } = require('../utils/distance');
const { ApiError } = require('../middleware/errorHandler');


const schoolService = {
  
  async createSchool(schoolData) {
    try {
      // Parse latitude and longitude to ensure they're stored as floats
      const data = {
        ...schoolData,
        latitude: parseFloat(schoolData.latitude),
        longitude: parseFloat(schoolData.longitude)
      };

      // Create the school record in the database
      const school = await prisma.school.create({
        data
      });
      
      return school;
    } catch (error) {
      console.error('Error creating school:', error);
      throw new ApiError('Failed to create school record', 500);
    }
  },

  /**
   * List all schools sorted by distance from the provided coordinates
   * @param {number} latitude - User's latitude
   * @param {number} longitude - User's longitude
   * @returns {Promise<Array>} - Sorted array of schools with distance
   */
  async listSchoolsByDistance(latitude, longitude) {
    try {
      // Parse coordinates to ensure they're handled as numbers
      const userLat = parseFloat(latitude);
      const userLon = parseFloat(longitude);
      
      // Fetch all schools from the database
      const schools = await prisma.school.findMany();
      
      // Calculate distance for each school and add it as a property
      const schoolsWithDistance = schools.map(school => {
        const distance = calculateDistance(
          userLat, 
          userLon, 
          school.latitude, 
          school.longitude
        );
        
        return {
          ...school,
          distance: parseFloat(distance.toFixed(2)) // Round to 2 decimal places
        };
      });
      
      // Sort schools by distance (closest first)
      schoolsWithDistance.sort((a, b) => a.distance - b.distance);
      
      return schoolsWithDistance;
    } catch (error) {
      console.error('Error listing schools:', error);
      throw new ApiError('Failed to retrieve schools', 500);
    }
  }
};

module.exports = schoolService;

/**
 * School Routes - Defines API endpoints for school operations
 */

const express = require('express');
const schoolController = require('../controllers/schoolController');

const router = express.Router();

/**
 * @route POST /schools
 * @desc Add a new school
 * @access Public
 */
router.post('/', schoolController.addSchool);

/**
 * @route GET /schools
 * @desc List all schools sorted by distance
 * @access Public
 */
router.get('/', schoolController.listSchools);

module.exports = router;

const express = require('express');
const schoolController = require('../controllers/schoolController');

const router = express.Router();

router.post('/', schoolController.addSchool);

router.get('/', schoolController.listSchools);

module.exports = router;

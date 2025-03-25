/**
 * API Routes - Aggregates all route modules
 */

const express = require('express');
const schoolRoutes = require('./schoolRoutes');
const { ApiError } = require('../middleware/errorHandler');

const router = express.Router();

// Health check endpoint
router.get('/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'API is running',
    timestamp: new Date().toISOString()
  });
});

// Test endpoint for debugging request body issues
router.post('/test', (req, res) => {
  console.log('Test endpoint reached');
  console.log('Headers:', req.headers);
  console.log('Body:', req.body);
  
  return res.status(200).json({
    success: true,
    message: 'Test endpoint working',
    receivedData: req.body,
    contentType: req.headers['content-type']
  });
});

// Mount route modules
router.use('/schools',schoolRoutes);

// Handle 404 for any undefined API routes
router.use('*', (req, res, next) => {
  next(ApiError.notFound(`Route ${req.originalUrl} not found`));
});

module.exports = router;

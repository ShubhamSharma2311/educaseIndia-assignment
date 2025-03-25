/**
 * Main application file - Sets up the Express application
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const { errorHandler } = require('./middleware/errorHandler');
const routes = require('./routes');
const config = require('./config/config');

// Initialize Express app
const app = express();

// Apply security middleware
app.use(helmet());
app.use(cors(config.cors));

// Apply rate limiting
const limiter = rateLimit(config.rateLimit);
app.use(limiter);

// Request logging
app.use(morgan(config.server.env === 'development' ? 'dev' : 'combined'));

// Parse JSON request body
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Mount API routes
app.use(config.api.basePath, routes);

// Apply error handling middleware
app.use(errorHandler);

// Start the server
const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.server.env} mode on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}${config.api.basePath}`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
  // Consider a graceful shutdown in production
  // server.close(() => process.exit(1));
});

module.exports = app; // Export for testing

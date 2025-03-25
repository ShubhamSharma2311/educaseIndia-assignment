/**
 * Main application file - Sets up the Express application
 */

const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const routes = require('./src/routes');
const config = require('./src/config/config');

const app = express();

app.use(helmet());
app.use(cors(config.cors));

const limiter = rateLimit(config.rateLimit);
app.use(limiter);

app.use(morgan(config.server.env === 'development' ? 'dev' : 'combined'));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(config.api.basePath, routes);

const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    message: err.message || 'Internal Server Error',
    errors: err.errors || [],
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
  });
};

app.use(errorHandler);

const PORT = config.server.port;
app.listen(PORT, () => {
  console.log(`Server running in ${config.server.env} mode on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}${config.api.basePath}`);
});

process.on('unhandledRejection', (err) => {
  console.error('UNHANDLED REJECTION:', err);
});

module.exports = app;

/**
 * Application configuration management
 */

// Load environment variables if not in production
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const config = {
  // Server configuration
  server: {
    port: process.env.PORT || 3000,
    env: process.env.NODE_ENV || 'development',
    host: process.env.HOST || 'localhost'
  },
  
  // Database configuration (if needed separately from DATABASE_URL)
  database: {
    url: process.env.DATABASE_URL,
    maxConnections: process.env.DB_MAX_CONNECTIONS || 10
  },
  
  // API configuration
  api: {
    prefix: '/api',
    version: 'v1',
    rateLimit: {
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: process.env.RATE_LIMIT_MAX || 100 // requests per windowMs
    }
  },
  
  // CORS configuration
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
  }
};

// Compute derived configurations
config.api.basePath = `${config.api.prefix}/${config.api.version}`;

module.exports = config;

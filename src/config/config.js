/**
 * Application configuration
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
  },
  
  // Cors options
  cors: {
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  },
  
  // API settings
  api: {
    prefix: '/api',
    version: 'v1',
  },
  
  // Rate limiting to prevent abuse
  rateLimit: {
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  },
};

// Build the full API base path
config.api.basePath = `${config.api.prefix}/${config.api.version}`;

module.exports = config;

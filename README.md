# School Management API

A Node.js RESTful API for managing school data and calculating distances between geographical locations.

## Features

- Add new schools with location data
- Retrieve schools sorted by proximity to a given location
- Validation of input data
- Error handling and logging
- Containerized for easy deployment

## Quick Start with Docker

### Prerequisites
- [Docker](https://www.docker.com/products/docker-desktop) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

### Setup and Run

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd school-management-api
   ```

2. Create a `.env` file in the project root:
   ```
   DATABASE_URL="postgresql://user:password@host:port/database?schema=public"
   ```

3. Start the application:
   ```bash
   docker-compose up
   ```

4. The API will be available at http://localhost:3000/api/v1

## API Documentation

### Add School
- **Endpoint**: `/api/v1/schools`
- **Method**: POST
- **Body**:
  ```json
  {
    "name": "Example School",
    "address": "123 Education St, City",
    "latitude": 37.7749,
    "longitude": -122.4194
  }
  ```
- **Response**:
  ```json
  {
    "success": true,
    "message": "School added successfully",
    "data": {
      "id": 1,
      "name": "Example School",
      "address": "123 Education St, City",
      "latitude": 37.7749,
      "longitude": -122.4194,
      "createdAt": "2023-07-14T10:30:00.000Z",
      "updatedAt": "2023-07-14T10:30:00.000Z"
    }
  }
  ```

### List Schools
- **Endpoint**: `/api/v1/schools`
- **Method**: GET
- **Query Parameters**:
  - `latitude`: User's latitude (e.g., 37.7749)
  - `longitude`: User's longitude (e.g., -122.4194)
- **Response**:
  ```json
  {
    "success": true,
    "message": "Schools retrieved successfully",
    "count": 2,
    "data": [
      {
        "id": 1,
        "name": "Example School",
        "address": "123 Education St, City",
        "latitude": 37.7749,
        "longitude": -122.4194,
        "distance": 0,
        "createdAt": "2023-07-14T10:30:00.000Z",
        "updatedAt": "2023-07-14T10:30:00.000Z"
      },
      {
        "id": 2,
        "name": "Another School",
        "address": "456 Learning Ave, Town",
        "latitude": 37.7847,
        "longitude": -122.4278,
        "distance": 1.23,
        "createdAt": "2023-07-14T11:00:00.000Z",
        "updatedAt": "2023-07-14T11:00:00.000Z"
      }
    ]
  }
  ```

## Running Without Docker

If you prefer to run the application without Docker:

1. Ensure Node.js (v16+) is installed
2. Install dependencies: `npm install`
3. Set up your PostgreSQL database
4. Create a `.env` file with your `DATABASE_URL`
5. Generate Prisma client: `npx prisma generate`
6. Start the application: `npm run dev`

## Environment Variables

- `DATABASE_URL`: PostgreSQL connection string
- `PORT`: Server port (default: 3000)
- `NODE_ENV`: Application environment (development/production)

## Project Structure

# API Setup Guide

## Prerequisites

1. **Node.js** (v18 or higher)
2. **MongoDB** (local installation or MongoDB Atlas)
3. **pnpm** (for package management)

## Installation

1. Install dependencies:

```bash
cd my-app/apps/api
pnpm install
```

2. Set up environment variables:
   Create a `.env` file in the `apps/api` directory:

```env
MONGODB_URI=mongodb://localhost:27017/trust-network
PORT=3000
NODE_ENV=development
```

## Running the API

### Development Mode

```bash
pnpm run dev
```

### Production Mode

```bash
pnpm run build
pnpm run start:prod
```

## API Endpoints

The API provides the following endpoints for company management:

- `GET /companies` - Get all companies
- `GET /companies/search?keyword=term` - Search companies
- `GET /companies/find?keyword=term` - Quick company search
- `POST /companies` - Create a new company
- `GET /companies/:id` - Get company by ID
- `PATCH /companies/:id` - Update company
- `DELETE /companies/:id` - Delete company

## Search Functionality

The search API supports:

- **Real-time search** with onChange events
- **Case-insensitive** matching
- **Partial matching** across name, description, website, and location
- **Pagination** for large datasets

## Frontend Integration

For frontend integration, use the search endpoint:

```javascript
// Example: Search companies on input change
const handleSearch = async (keyword) => {
  const response = await fetch(
    `/companies/search?keyword=${encodeURIComponent(keyword)}&limit=10`,
  );
  const data = await response.json();
  return data.companies;
};
```

## Testing

Run tests:

```bash
pnpm run test
```

Run tests in watch mode:

```bash
pnpm run test:watch
```

## Database Schema

The company schema includes:

- `name` (unique, required)
- `description` (required)
- `location` (required)
- `website` (required, URL format)
- `admin` (required)
- `totalComments` (default: 0)
- `totalRating` (default: 0)
- `exists` (default: true, for soft deletes)
- `createdAt` (auto-generated)
- `updatedAt` (auto-generated)

## Features

- ✅ MongoDB integration with Mongoose
- ✅ Input validation with class-validator
- ✅ Search functionality with pagination
- ✅ Soft delete support
- ✅ CORS enabled
- ✅ Error handling
- ✅ TypeScript support
- ✅ Unit tests
- ✅ Real-time search ready for frontend onChange events

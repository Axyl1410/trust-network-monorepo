# Companies API Documentation

## Base URL

`http://localhost:3000/companies`

## Endpoints

### 1. Create Company

**POST** `/companies`

**Request Body:**

```json
{
  "name": "Company Name",
  "description": "Company description",
  "location": "Company location",
  "website": "https://company.com",
  "admin": "admin_address"
}
```

**Response:**

```json
{
  "_id": "company_id",
  "name": "Company Name",
  "description": "Company description",
  "location": "Company location",
  "website": "https://company.com",
  "admin": "admin_address",
  "totalComments": 0,
  "totalRating": 0,
  "exists": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 2. Get All Companies

**GET** `/companies`

**Response:**

```json
[
  {
    "_id": "company_id",
    "name": "Company Name",
    "description": "Company description",
    "location": "Company location",
    "website": "https://company.com",
    "admin": "admin_address",
    "totalComments": 0,
    "totalRating": 0,
    "exists": true,
    "createdAt": "2024-01-01T00:00:00.000Z",
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
]
```

### 3. Search Companies

**GET** `/companies/search?keyword=search_term&page=1&limit=10`

**Query Parameters:**

- `keyword` (optional): Search term for company name, description, website, or location
- `page` (optional): Page number (default: 1)
- `limit` (optional): Number of results per page (default: 10)

**Response:**

```json
{
  "companies": [
    {
      "_id": "company_id",
      "name": "Company Name",
      "description": "Company description",
      "location": "Company location",
      "website": "https://company.com",
      "admin": "admin_address",
      "totalComments": 0,
      "totalRating": 0,
      "exists": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 10,
    "total": 1,
    "pages": 1
  }
}
```

### 4. Find Company (Quick Search)

**GET** `/companies/find?keyword=search_term`

**Query Parameters:**

- `keyword` (required): Search term

**Response:**

```json
{
  "companies": [
    {
      "_id": "company_id",
      "name": "Company Name",
      "description": "Company description",
      "location": "Company location",
      "website": "https://company.com",
      "admin": "admin_address",
      "totalComments": 0,
      "totalRating": 0,
      "exists": true,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  ],
  "pagination": {
    "page": 1,
    "limit": 1,
    "total": 1,
    "pages": 1
  }
}
```

### 5. Get Company by ID

**GET** `/companies/:id`

**Response:**

```json
{
  "_id": "company_id",
  "name": "Company Name",
  "description": "Company description",
  "location": "Company location",
  "website": "https://company.com",
  "admin": "admin_address",
  "totalComments": 0,
  "totalRating": 0,
  "exists": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 6. Update Company

**PATCH** `/companies/:id`

**Request Body:**

```json
{
  "name": "Updated Company Name",
  "description": "Updated description"
}
```

**Response:**

```json
{
  "_id": "company_id",
  "name": "Updated Company Name",
  "description": "Updated description",
  "location": "Company location",
  "website": "https://company.com",
  "admin": "admin_address",
  "totalComments": 0,
  "totalRating": 0,
  "exists": true,
  "createdAt": "2024-01-01T00:00:00.000Z",
  "updatedAt": "2024-01-01T00:00:00.000Z"
}
```

### 7. Delete Company (Soft Delete)

**DELETE** `/companies/:id`

**Response:**

```json
{
  "message": "Company deleted successfully"
}
```

## Error Responses

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": ["name must not be empty"],
  "error": "Bad Request"
}
```

### 404 Not Found

```json
{
  "statusCode": 404,
  "message": "Company not found",
  "error": "Not Found"
}
```

### 409 Conflict

```json
{
  "statusCode": 409,
  "message": "Company with this name already exists",
  "error": "Conflict"
}
```

## Search Features

The search functionality supports:

- **Case-insensitive search** across company name, description, website, and location
- **Partial matching** - you can search for part of a company name
- **Pagination** for large result sets
- **Real-time search** suitable for frontend onChange events

## Frontend Integration

For frontend integration with onChange events, use the search endpoint:

```javascript
// Example frontend usage
const searchCompanies = async (keyword) => {
  const response = await fetch(
    `/companies/search?keyword=${encodeURIComponent(keyword)}&limit=10`,
  );
  const data = await response.json();
  return data.companies;
};
```

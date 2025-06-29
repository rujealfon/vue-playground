# Mock API Server

Technical documentation for the JSON Server-based mock API.

## 📁 Files Overview

- **`db.json`** - Mock database with blog posts, categories, tags, comments, users, and media
- **`routes.json`** - API route mappings for REST endpoints and WordPress compatibility
- **`middleware.cjs`** - JWT authentication middleware with user management

## 🔧 Server Configuration

### JSON Server Setup

The server uses [json-server](https://github.com/typicode/json-server) with custom middleware for authentication and route mapping.

### Port Configuration

Default port: `3001`

To change the port, update the `mock-api` script in `package.json`:
```json
{
  "scripts": {
    "mock-api": "json-server --watch server/db.json --port 3001 --routes server/routes.json --middlewares server/middleware.cjs"
  }
}
```

### Route Mapping (`routes.json`)

Custom route mappings that provide:
- RESTful API endpoints (`/api/*`)
- WordPress compatibility (`/wp-json/wp/v2/*`)
- Resource relationships and filtering

```json
{
  "/api/*": "/$1",
  "/wp-json/wp/v2/posts": "/posts",
  "/wp-json/wp/v2/categories": "/categories",
  "/api/posts/:id/comments": "/comments?postId=:id",
  "/api/categories/:id/posts": "/posts?categoryId=:id"
}
```

### Authentication Middleware (`middleware.cjs`)

Custom Express middleware that handles:

- **JWT token generation and validation**
- **User authentication endpoints** (`/auth/*`)
- **Password-less demo authentication** (any password works)
- **Role-based access control**
- **Token refresh functionality**

#### Key Features:
- Uses `jsonwebtoken` for JWT handling
- Access tokens: 15-minute expiry
- Refresh tokens: 7-day expiry
- CORS enabled for all origins
- Password validation bypassed for demo purposes

#### Environment Variables:
```env
JWT_SECRET=your-jwt-secret
JWT_REFRESH_SECRET=your-refresh-secret
```

## 🗄️ Database Structure (`db.json`)

### Collections:
- `posts` - Blog posts with content, metadata, and relationships
- `categories` - Hierarchical categories with slugs and colors
- `tags` - Content tags for organization
- `comments` - Threaded comments with moderation status
- `users` - User accounts with roles and profiles
- `media` - Media files and attachments

### Relationships:
- Posts → Users (authorId)
- Posts → Categories (categoryId)
- Posts → Tags (tagIds array)
- Comments → Posts (postId)
- Comments → Users (authorId)
- Comments → Comments (parentId for threading)

## 🔧 Customization

### Adding New Data

Edit `db.json` directly to add:
```json
{
  "posts": [
    {
      "id": 4,
      "title": "New Post",
      "content": "Content here...",
      "authorId": 1,
      "categoryId": 1,
      "tagIds": [1, 2],
      "status": "published",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  ]
}
```

### Modifying Authentication

Update `middleware.cjs` to:
- Change JWT expiry times
- Modify user roles and permissions
- Add new authentication endpoints
- Implement real password validation

### Adding New Routes

Extend `routes.json` for custom endpoints:
```json
{
  "/api/custom-endpoint": "/your-collection",
  "/api/posts/:id/custom": "/custom?postId=:id"
}
```

## 🧪 Development

### Starting the Server

```bash
# Development
bun run mock-api

# With different port
json-server --watch server/db.json --port 4000 --routes server/routes.json --middlewares server/middleware.cjs
```

### Debugging

Enable JSON Server logging:
```bash
DEBUG=json-server:* bun run mock-api
```

### Testing Endpoints

Use the curl examples in the main README.md or:
```bash
# Test server status
curl http://localhost:3001/api/posts

# Test auth
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "test"}'
```

## ⚠️ Production Notes

This is a development/demo API. For production:

1. **Replace with real database** (PostgreSQL, MongoDB, etc.)
2. **Implement proper authentication** with password hashing
3. **Add input validation and sanitization**
4. **Use environment variables** for sensitive configuration
5. **Add rate limiting and security headers**
6. **Implement proper error handling**

The current setup is optimized for rapid development and testing of frontend applications.
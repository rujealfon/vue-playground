# Vue Playground - Feature-Based Architecture

A modern Vue.js application built with a feature-based architecture and comprehensive WordPress-like mock API designed for medium to large-scale applications.

## 🏗️ Architecture Overview

This project follows a feature-based architecture pattern that organizes code by business domains rather than technical layers. This approach provides better maintainability, scalability, and team collaboration.

### Directory Structure

```
src/
├── features/           # Feature modules (business domains)
│   ├── auth/          # Authentication feature
│   │   ├── components/
│   │   ├── composables/
│   │   ├── services/
│   │   │   └── auth.service.ts
│   │   ├── stores/
│   │   │   └── auth.store.ts
│   │   ├── types/
│   │   │   └── index.ts
│   │   └── index.ts   # Feature exports
│   ├── dashboard/     # Dashboard feature
│   │   ├── components/
│   │   ├── composables/
│   │   ├── services/
│   │   ├── stores/
│   │   │   └── counter.ts
│   │   └── types/
│   │       └── index.ts
│   └── users/         # User management feature
│       ├── components/
│       ├── composables/
│       ├── services/
│       ├── stores/
│       └── types/
├── shared/            # Shared/common code
│   ├── components/    # Reusable UI components
│   │   ├── layouts/   # Layout components
│   │   │   ├── dashboard-layout.vue
│   │   │   ├── default-layout.vue
│   │   │   └── index.ts
│   │   ├── navigation/ # Navigation components
│   │   │   ├── dashboard-header.vue
│   │   │   ├── dashboard-sidebar.vue
│   │   │   ├── default-footer.vue
│   │   │   ├── default-header.vue
│   │   │   └── index.ts
│   │   └── ui/        # Base UI components
│   │       └── button/
│   │           ├── Button.vue
│   │           └── index.ts
│   ├── services/      # Shared services (API, etc.)
│   │   ├── api.ts
│   │   └── api-examples.ts
│   ├── utils/         # Utility functions
│   │   ├── index.ts
│   │   └── utils.ts
│   ├── types/         # Common types
│   │   └── index.ts
│   └── constants/     # Application constants
│       └── index.ts
├── core/              # Core application setup
│   └── router/        # Router configuration
│       └── index.ts
├── pages/             # Route components
│   ├── dashboard/     # Dashboard sub-pages
│   │   ├── analytics.vue    # Analytics and metrics
│   │   ├── profile.vue      # User profile management
│   │   ├── settings.vue     # Application settings
│   │   └── users.vue        # User management
│   ├── about.vue      # About page
│   ├── dashboard.vue  # Main dashboard page
│   ├── index.vue      # Home/landing page
│   └── login.vue      # Authentication page
├── assets/            # Static assets
│   └── main.css
├── app.vue            # Root component
└── main.ts            # Application entry point
```

## 🎯 Key Features

### Authentication System

- **Complete auth flow**: Login, register, logout, profile management
- **JWT token handling**: Automatic token refresh and storage
- **Role-based access**: User roles and permissions with route-level protection
- **Route guards**: Automatic authentication checks and redirects
- **Session persistence**: Authentication state restored on app restart
- **Type safety**: Full TypeScript support with Zod validation

### API Integration

- **ofetch**: Modern fetch wrapper with interceptors
- **Automatic auth**: Token injection and error handling
- **Type safety**: Request/response validation with Zod
- **Error handling**: Centralized error management

### State Management

- **Pinia**: Modern Vue state management
- **Feature stores**: Each feature has its own store
- **Composables**: Reusable logic with Vue Composition API

### Layout System

- **Multiple layouts**: Default and Dashboard layouts for different app sections
- **Responsive design**: Mobile-first approach with adaptive navigation
- **Navigation components**: Reusable header, footer, and sidebar components
- **Authentication integration**: Layout-aware auth status and user management

### Development Experience

- **TypeScript**: Full type safety throughout the application
- **ESLint**: Code quality and consistency
- **Bun**: Fast package manager and bundler
- **Vue Router**: File-based routing with unplugin-vue-router

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ or Bun
- Vue 3 knowledge
- TypeScript familiarity

### Installation & Setup

```bash
# Install dependencies
bun install

# Copy environment file
cp .env.example .env

# Start both Vue app and API server
bun run dev:full

# Or start them separately:
# Start development server only
bun run dev

# Start API server only
bun run mock-api
```

The Vue app will be available at: `http://localhost:5173`
The API server will be available at: `http://localhost:3001`

### Build & Test

```bash
# Build for production
bun build

# Run tests
bun test:unit
bun test:e2e

# Lint code
bun run lint
```

## 📡 WordPress-like Mock API

The project includes a comprehensive WordPress-like blog API built with JSON Server, featuring JWT authentication, full CRUD operations, and WordPress REST API compatibility.

### ✅ API Status
- **Server**: Running on `http://localhost:3001`
- **Authentication**: JWT-based with demo users
- **WordPress Compatibility**: Full REST API support
- **CORS Enabled**: Ready for cross-origin requests

### 🔐 Authentication

#### Demo User Credentials

| Email | Role | Password | Description |
|-------|------|----------|-------------|
| `john@example.com` | Admin | Any password | Full access to all features |
| `jane@example.com` | Editor | Any password | Can create/edit posts |

#### JWT Configuration
- **Access Token**: 15-minute expiry
- **Refresh Token**: 7-day expiry
- **Automatic refresh**: Supported via `/api/auth/refresh`

#### Authentication Examples

**Login:**
```bash
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "any-password"
  }'
```

**Get Profile (with token):**
```bash
curl -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  http://localhost:3001/api/auth/profile
```

### 📡 API Endpoints

#### Authentication
- `POST /api/auth/login` - User login
- `POST /api/auth/register` - User registration
- `POST /api/auth/logout` - User logout
- `GET /api/auth/profile` - Get user profile
- `PATCH /api/auth/profile` - Update user profile
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/forgot-password` - Forgot password
- `POST /api/auth/reset-password` - Reset password

#### Blog Content
- `GET /api/posts` - Get all posts
- `GET /api/posts/:id` - Get single post
- `POST /api/posts` - Create post (requires auth)
- `PUT /api/posts/:id` - Update post (requires auth)
- `DELETE /api/posts/:id` - Delete post (requires auth)
- `GET /api/posts/:id/comments` - Get post comments
- `GET /api/posts/search?q=term` - Search posts

#### Categories & Tags
- `GET /api/categories` - Get all categories
- `GET /api/categories/:id` - Get single category
- `GET /api/categories/:id/posts` - Get category posts
- `GET /api/tags` - Get all tags
- `GET /api/tags/:id` - Get single tag
- `GET /api/tags/:id/posts` - Get tag posts

#### Comments
- `GET /api/comments` - Get all comments
- `POST /api/comments` - Create comment
- `PUT /api/comments/:id` - Update comment (requires auth)
- `DELETE /api/comments/:id` - Delete comment (requires auth)

#### Users & Media
- `GET /api/users` - Get all users
- `GET /api/users/:id` - Get single user
- `GET /api/users/:id/posts` - Get user posts
- `GET /api/media` - Get media files
- `POST /api/media` - Upload media (requires auth)

#### WordPress Compatibility
- `GET /wp-json/wp/v2/posts` - WordPress-style posts endpoint
- `GET /wp-json/wp/v2/categories` - WordPress-style categories
- `GET /wp-json/wp/v2/comments` - WordPress-style comments

### 📝 API Usage Examples

#### Get All Posts
```bash
curl http://localhost:3001/api/posts
```

#### Create New Post (requires auth)
```bash
curl -X POST http://localhost:3001/api/posts \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_ACCESS_TOKEN" \
  -d '{
    "title": "My New Post",
    "content": "<p>This is my new post content</p>",
    "excerpt": "A brief excerpt",
    "status": "published",
    "authorId": 1
  }'
```

#### Search & Filtering
```bash
# Search posts
curl "http://localhost:3001/api/posts?q=Vue"

# Filter by status
curl "http://localhost:3001/api/posts?status=published"

# Pagination
curl "http://localhost:3001/api/posts?_page=1&_limit=5"
```

### 📊 Sample Data Included

- **3 Blog Posts** (Vue.js, Tailwind CSS, Authentication topics)
- **4 Categories** (Frontend, CSS, Tutorials, Backend)
- **9 Tags** (Vue.js, TypeScript, Tailwind, etc.)
- **3 Comments** (with threading support)
- **2 Users** (Admin, Editor roles)
- **1 Media File** (featured image)

### 🎨 API Features

✅ **Full CRUD Operations** for all resources
✅ **JWT Authentication** with refresh tokens
✅ **Role-based Access Control** (admin, editor, author)
✅ **WordPress REST API Compatibility**
✅ **Search & Filtering**
✅ **Pagination Support**
✅ **Threaded Comments**
✅ **Media Management**
✅ **CORS Enabled**
✅ **Realistic Blog Data**

## 🔧 Development Guidelines

### Creating a New Feature

1. **Create feature directory**:

   ```bash
   mkdir -p src/features/my-feature/{components,composables,services,stores,types}
   ```

2. **Define types** (`src/features/my-feature/types/index.ts`):

   ```typescript
   export type MyFeatureState = {
     data: any[]
     isLoading: boolean
     error: string | null
   }
   ```

3. **Create service** (`src/features/my-feature/services/my-feature.service.ts`):

   ```typescript
   import { api } from '@/shared/services/api'

   class MyFeatureService {
     async getData() {
       return await api('/my-feature/data')
     }
   }

   export const myFeatureService = new MyFeatureService()
   ```

4. **Create store** (`src/features/my-feature/stores/my-feature.store.ts`):

   ```typescript
   import { defineStore } from 'pinia'
   import { ref } from 'vue'

   import { myFeatureService } from '../services/my-feature.service'

   export const useMyFeatureStore = defineStore('myFeature', () => {
     const data = ref([])
     const isLoading = ref(false)

     const fetchData = async () => {
       isLoading.value = true
       try {
         data.value = await myFeatureService.getData()
       }
       catch (error) {
         console.error('Error fetching data:', error)
       }
       finally {
         isLoading.value = false
       }
     }

     return {
       data,
       isLoading,
       fetchData,
     }
   })
   ```

5. **Export feature** (`src/features/my-feature/index.ts`):

   ```typescript
   export * from './stores/my-feature.store'
   export * from './services/my-feature.service'
   export * from './types'
   ```

### Adding Components

1. **Create component directory**:
   ```bash
   mkdir -p src/shared/components/my-component
   ```

2. **Component structure**:
   ```
   my-component/
   ├── MyComponent.vue
   └── index.ts
   ```

3. **Export component** (`index.ts`):
   ```typescript
   export { default as MyComponent } from './MyComponent.vue'
   ```

### Working with the API

The project includes a pre-configured API client with authentication handling:

```typescript
import { api } from '@/shared/services/api'

// GET request
const posts = await api('/posts')

// POST request with auth
const newPost = await api('/posts', {
  method: 'POST',
  body: {
    title: 'New Post',
    content: 'Content here'
  }
})
```

## 🧩 Component Architecture

### Layout Components

#### Default Layout (`src/shared/components/layouts/default-layout.vue`)
- Used for public pages (home, about, login)
- Includes header with navigation and footer
- Responsive design with mobile navigation
- Authentication-aware menu items

#### Dashboard Layout (`src/shared/components/layouts/dashboard-layout.vue`)
- Used for authenticated dashboard pages
- Includes dashboard header and sidebar
- User profile integration
- Role-based navigation

### Navigation Components

#### Dashboard Header (`src/shared/components/navigation/dashboard-header.vue`)
- User profile dropdown with avatar
- Notifications and settings access
- Mobile menu toggle
- Logout functionality

#### Dashboard Sidebar (`src/shared/components/navigation/dashboard-sidebar.vue`)
- Navigation menu for dashboard sections
- User profile with avatar and role badge
- Logout functionality
- Mobile-responsive with overlay

#### Default Footer (`src/shared/components/navigation/default-footer.vue`)
- Multi-column layout with organized links
- Brand information and copyright
- Responsive design for mobile devices

### Usage Example

```vue
<script setup lang="ts">
import { DefaultLayout } from '@/shared/components/layouts'
</script>

<template>
  <DefaultLayout>
    <div class="container mx-auto">
      <!-- Your page content -->
    </div>
  </DefaultLayout>
</template>
```

## 📄 Page Structure

The application includes a comprehensive set of pages organized by functionality:

### Public Pages (Default Layout)
- **Home (`/`)**: Landing page with feature overview and authentication status
- **About (`/about`)**: Information about the application and technology stack
- **Login (`/login`)**: User authentication form

### Dashboard Pages (Dashboard Layout)
- **Dashboard (`/dashboard`)**: Main dashboard with statistics and feature overview
- **Analytics (`/dashboard/analytics`)**: Data insights and performance metrics
- **Profile (`/dashboard/profile`)**: User profile management and settings
- **Settings (`/dashboard/settings`)**: Application configuration and preferences
- **Users (`/dashboard/users`)**: User management interface (admin feature)

### Route Protection
- **Public pages** (`/`, `/about`, `/login`): Accessible to all users
- **Dashboard pages** (`/dashboard/*`): Require authentication
- **Role-based access**: Some dashboard features require specific user roles
  - `/dashboard/users`: Admin access only

## 🔒 Security Features

### Route Protection
```typescript
// Route guard implementation in src/core/router/index.ts
router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore()

  // Check if route requires authentication
  const requiresAuth = to.path.startsWith('/dashboard')

  if (requiresAuth && !authStore.isAuthenticated) {
    next({ path: '/login', query: { redirect: to.fullPath } })
    return
  }

  // Role-based access control
  const requiredRoles = ROUTE_PERMISSIONS[to.path]
  if (requiredRoles && !requiredRoles.includes(authStore.userRole)) {
    next('/dashboard') // Redirect to main dashboard
    return
  }

  next()
})
```

### API Security
- JWT tokens with automatic refresh
- Request/response interceptors
- Error handling and token cleanup
- Protected routes requiring authentication

## 🌐 Environment Configuration

### Environment Variables

Create a `.env` file in the project root:

```env
# API Configuration
VITE_API_BASE_URL=http://localhost:3001/api

# JWT Secrets (change in production!)
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
JWT_REFRESH_SECRET=your-super-secret-refresh-key-change-this-in-production
```

**⚠️ Important for Production:**
- Generate secure random strings for JWT secrets
- Use: `openssl rand -base64 32` to generate secure keys
- Never use the example keys in production!

### Build Configuration

The project uses Vite with custom configurations:

- **TypeScript**: Full type checking
- **Path aliases**: `@/` pointing to `src/`
- **Auto-imports**: Vue composables and utilities
- **Hot reload**: Fast development experience

## 🧪 Testing

### Quick API Tests

```bash
# Test API status
curl http://localhost:3001/api/posts

# Test authentication
curl -X POST http://localhost:3001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email": "john@example.com", "password": "test"}'

# Test WordPress compatibility
curl http://localhost:3001/wp-json/wp/v2/posts

# Test search
curl "http://localhost:3001/api/posts?q=Vue"
```

### Running Tests

```bash
# Unit tests
bun test:unit

# E2E tests
bun test:e2e:dev  # Interactive mode
bun test:e2e      # Headless mode

# Lint and format
bun run lint
bun run lint:fix
```

## 🚀 Deployment

### Production Checklist

1. **Environment Setup**:
   - Replace JWT secrets with secure values
   - Update API base URL for production
   - Configure CORS for your domain

2. **Security**:
   - Implement real password hashing
   - Add rate limiting
   - Use HTTPS in production
   - Add input validation and sanitization

3. **Database**:
   - Replace JSON files with real database
   - Implement proper data persistence
   - Add database migrations

4. **Build & Deploy**:
   ```bash
   bun run build
   # Deploy dist/ folder to your hosting service
   ```

### Recommended Stack for Production

- **Frontend**: Vercel, Netlify, or similar
- **Backend**: Node.js with Express or Fastify
- **Database**: PostgreSQL or MongoDB
- **Authentication**: Auth0, Supabase Auth, or custom JWT implementation

## 📚 Tech Stack

### Frontend
- **Vue 3** - Progressive JavaScript framework
- **TypeScript** - Type safety and better DX
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Vue Router** - Official router with file-based routing
- **Pinia** - State management for Vue
- **ofetch** - Modern fetch wrapper
- **Zod** - Schema validation

### Development Tools
- **Bun** - Fast package manager and runtime
- **ESLint** - Code linting and formatting
- **Prettier** - Code formatting
- **TypeScript** - Static type checking
- **Cypress** - E2E testing
- **Vitest** - Unit testing

### Mock API
- **JSON Server** - Mock REST API
- **JWT** - Authentication tokens
- **CORS** - Cross-origin requests
- **Custom Middleware** - Authentication logic

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes following the coding guidelines
4. Run tests: `bun test:unit`
5. Commit your changes: `git commit -m 'Add amazing feature'`
6. Push to the branch: `git push origin feature/amazing-feature`
7. Open a Pull Request

## 📄 License

This project is licensed under the MIT License.

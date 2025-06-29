# Vue Playground - Feature-Based Architecture

A modern Vue.js application built with a feature-based architecture designed for medium to large-scale applications.

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

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ or Bun
- Vue 3 knowledge
- TypeScript familiarity

### Installation

```bash
# Install dependencies
bun install

# Start development server
bun dev

# Build for production
bun build

# Run tests
bun test:unit
bun test:e2e
```

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

     return { data, isLoading, fetchData }
   })
   ```

5. **Export from feature** (`src/features/my-feature/index.ts`):
   ```typescript
   export { myFeatureService } from './services/my-feature.service'
   export { useMyFeatureStore } from './stores/my-feature.store'
   export type * from './types'
   ```

### Best Practices

#### 1. Feature Isolation

- Each feature should be self-contained
- Dependencies between features should be minimal
- Shared code goes in the `shared/` directory

#### 2. Type Safety

- Use TypeScript for all code
- Define proper types for all data structures
- Use Zod for runtime validation

#### 3. State Management

- Keep feature stores focused on their domain
- Use composables for reusable logic
- Avoid global state when possible

#### 4. API Integration

- Use the shared API service for HTTP requests
- Implement proper error handling
- Validate responses with Zod schemas

#### 5. Component Organization

- Keep components small and focused
- Use composition API for complex logic
- Separate presentation from business logic

#### 6. Layout Usage

- Use DefaultLayout for public pages (home, about, login)
- Use DashboardLayout for authenticated pages
- Leverage shared navigation components for consistency
- Ensure responsive design across all layouts

#### 7. Route Protection

- All `/dashboard/*` routes are automatically protected
- Configure role-based permissions in `src/core/router/index.ts`:
  ```typescript
  const ROUTE_PERMISSIONS = {
    '/dashboard/users': ['admin'],
    '/dashboard/admin': ['admin', 'moderator'],
  }
  ```
- Use auth store's role checking methods: `hasRole()`, `hasAnyRole()`
- Test route protection by accessing dashboard routes while logged out

## 📁 Feature Examples

### Auth Feature Structure

```
src/features/auth/
├── components/
│   ├── LoginForm.vue
│   ├── RegisterForm.vue
│   └── ProfileCard.vue
├── composables/
│   └── useAuth.ts
├── services/
│   └── auth.service.ts
├── stores/
│   └── auth.store.ts
├── types/
│   └── index.ts
└── index.ts
```

### Dashboard Feature Structure

```
src/features/dashboard/
├── components/
│   ├── StatsCard.vue
│   ├── ActivityFeed.vue
│   └── Chart.vue
├── stores/
│   ├── dashboard.store.ts
│   └── counter.ts
├── types/
│   └── index.ts
└── index.ts
```

## 🎨 Layout System

The application includes a comprehensive layout system with multiple layouts and navigation components.

### Layout Components

#### Default Layout (`src/shared/components/layouts/default-layout.vue`)
- Used for public pages (home, about, login)
- Includes header with navigation and authentication status
- Footer with site information and links
- Responsive design with mobile menu

#### Dashboard Layout (`src/shared/components/layouts/dashboard-layout.vue`)
- Used for authenticated dashboard pages
- Fixed sidebar navigation on desktop
- Collapsible mobile navigation with overlay
- User profile section with role display

### Navigation Components

#### Default Header (`src/shared/components/navigation/default-header.vue`)
- Responsive navigation bar
- Authentication status display
- Mobile hamburger menu
- User profile dropdown (when authenticated)

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
- **Automatic redirects**:
  - Unauthenticated users accessing dashboard routes are redirected to login
  - After successful login, users are redirected to their intended destination
  - Authenticated users accessing login page are redirected to dashboard
  - Users without required permissions are redirected to main dashboard

## 🔗 Shared Resources

### API Service

Located in `src/shared/services/api.ts`, provides:

- HTTP client with interceptors
- Automatic authentication
- Error handling
- Request/response logging

### Layout Components

Located in `src/shared/components/layouts/`:

- **DefaultLayout**: For public pages with header/footer
- **DashboardLayout**: For authenticated pages with sidebar
- Responsive design and mobile support
- Authentication integration

### Navigation Components

Located in `src/shared/components/navigation/`:

- **DefaultHeader**: Main navigation with auth status
- **DefaultFooter**: Site footer with links and info
- **DashboardSidebar**: Dashboard navigation menu
- **DashboardHeader**: Dashboard-specific header

### UI Components

Located in `src/shared/components/ui/`:

- **Button**: Reusable button component with variants
- **AccessDenied**: Component for displaying access denied messages
- Additional UI components as needed
- Consistent styling with Tailwind CSS

### Types

Common types in `src/shared/types/index.ts`:

- Base entities
- API responses
- User types
- UI component types

### Constants

Application constants in `src/shared/constants/index.ts`:

- API endpoints
- Storage keys
- Error messages
- Feature flags

## 🧪 Testing

### Unit Tests

```bash
# Run unit tests
bun test:unit

# Run tests in watch mode
bun test:unit --watch
```

### E2E Tests

```bash
# Run e2e tests
bun test:e2e

# Run e2e tests in development mode
bun test:e2e:dev
```

## 📦 Dependencies

### Core

- **Vue 3**: Progressive JavaScript framework
- **TypeScript**: Type safety and better developer experience
- **Pinia**: State management for Vue
- **Vue Router**: Official router for Vue.js

### API & Validation

- **ofetch**: Modern fetch wrapper
- **Zod**: TypeScript-first schema validation

### UI & Styling

- **Tailwind CSS**: Utility-first CSS framework
- **Reka UI**: Headless UI components
- **Lucide Vue**: Beautiful icons

### Development

- **Vite**: Fast build tool
- **ESLint**: Code linting
- **Husky**: Git hooks
- **Vitest**: Testing framework

## 🤝 Contributing

1. Follow the feature-based architecture
2. Write tests for new features
3. Use TypeScript and proper typing
4. Follow ESLint rules
5. Write meaningful commit messages

## 📄 License

This project is licensed under the MIT License.

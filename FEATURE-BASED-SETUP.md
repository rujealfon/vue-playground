# Feature-Based Vue 3 Project Setup

This project has been updated to use a feature-based architecture with modern Vue 3 technologies.

## 🏗️ Architecture Overview

The project now follows a feature-based directory structure that promotes better organization and maintainability:

```
src/
├── api/                    # API client and configuration
│   └── client.ts          # Ofetch-based API client with interceptors
├── features/              # Feature-based modules
│   ├── auth/              # Authentication feature
│   │   ├── components/    # Auth-specific components
│   │   ├── composables/   # Auth-specific composables
│   │   ├── schemas/       # Zod validation schemas
│   │   ├── services/      # Auth business logic
│   │   ├── stores/        # Auth Pinia store
│   │   ├── types/         # TypeScript type definitions
│   │   └── index.ts       # Feature exports
│   ├── dashboard/         # Dashboard feature
│   │   ├── components/    # Dashboard components
│   │   ├── schemas/       # Dashboard schemas
│   │   └── types/         # Dashboard types
│   └── shared/            # Shared components and utilities
│       ├── components/    # Shared UI components
│       ├── schemas/       # Common reusable schemas
│       └── types/         # Shared type definitions
├── schemas/               # Centralized schema exports
├── types/                 # Centralized type exports
├── stores/                # Global Pinia stores
└── pages/                 # Vue Router pages
```

## 🛠️ Technologies Used

### Core Technologies

- **Vue 3** - Composition API with `<script setup>`
- **TypeScript** - Full type safety
- **Pinia** - State management with simple reactive stores
- **Vue Router** - Routing with auto-generated routes

### Additional Libraries

- **Zod** - Schema validation with TypeScript inference
- **VeeValidate** - Form validation with Zod integration
- **ofetch** - HTTP client with interceptors
- **shadcn/vue** - Modern UI components
- **TailwindCSS** - Utility-first styling

## 🔐 Authentication System

The authentication system uses a simple, straightforward Pinia store approach for easy understanding and maintenance.

### Store Structure

```typescript
// src/features/auth/stores/auth-store.ts
export const useAuthStore = defineStore('auth', () => {
  // Simple reactive state
  const user = ref<User | null>(null)
  const token = ref<string | null>(null)
  const isLoading = ref(false)

  // Error states for different operations
  const loginError = ref<ApiError | null>(null)
  const registerError = ref<ApiError | null>(null)

  // Computed properties
  const isAuthenticated = computed(() => !!user.value && !!token.value)

  // Async actions
  const login = async (credentials: LoginForm) => {
    try {
      isLoading.value = true
      loginError.value = null
      const data = await AuthService.login(credentials)
      user.value = data.user
      token.value = data.token
      return data
    }
    catch (error) {
      loginError.value = error as ApiError
      throw error
    }
    finally {
      isLoading.value = false
    }
  }

  return {
    user,
    token,
    isAuthenticated,
    isLoading,
    loginError,
    registerError,
    login,
    register,
    logout,
    getCurrentUser
  }
})
```

### Components

- `LoginForm` - Email/password login with validation
- `RegisterForm` - User registration with password confirmation
- `Navbar` - Responsive navigation with auth state

### Features

- **Simple State Management** - Direct Pinia store without complex abstractions
- **Zod Schema Validation** - Type-safe form validation
- **JWT Token Management** - Automatic token handling
- **API Interceptors** - Automatic auth header injection
- **Persistent Sessions** - LocalStorage-based persistence
- **Error Handling** - Separate error states for different operations
- **Loading States** - UI feedback during async operations

### Usage Example

```vue
<script setup>
import { useAuth } from '@/features/auth'

const { user, isAuthenticated, isLoading, login, logout } = useAuth()

async function handleLogin(credentials) {
  try {
    await login(credentials)
    // Handle success
  }
  catch (error) {
    // Handle error - error state automatically managed
  }
}
</script>
```

## 📝 Schema Organization and Validation

The project uses a dedicated schema organization structure for better maintainability:

### Schema Structure

```
feature/
├── schemas/           # Zod validation schemas
│   ├── auth-schemas.ts
│   └── index.ts
├── types/             # TypeScript type definitions
│   └── index.ts
└── ...
```

### Schema Definition

```typescript
// In src/features/auth/schemas/auth-schemas.ts
// In src/features/auth/types/index.ts
import { loginSchema } from '../schemas'

export const loginSchema = z.object({
  email: z
    .string()
    .min(1, 'Email is required')
    .email('Invalid email address'),
  password: z
    .string()
    .min(6, 'Password must be at least 6 characters')
})
export type LoginForm = z.infer<typeof loginSchema>
```

### Usage in Components

```typescript
import type { LoginForm } from '@/features/auth'

import { loginSchema } from '@/features/auth'

const { handleSubmit } = useForm({
  validationSchema: toTypedSchema(loginSchema)
})

const onSubmit = handleSubmit(async (values: LoginForm) => {
  // values is fully typed based on schema
})
```

### Shared Schemas

Common schemas are available in `src/features/shared/schemas/`:

- Pagination schemas
- Date range validation
- File upload schemas
- Address and contact schemas
- API response schemas

## 🌐 API Client

The API client uses ofetch with built-in interceptors:

```typescript
// Automatic auth token injection
// Error handling and retry logic
// Request/response logging

// Usage
import { api } from '@/api/client'

const users = await api.get('/users')
const newUser = await api.post('/users', userData)
```

## 🗄️ State Management

Uses standard Pinia stores with simple reactive patterns:

```typescript
// Simple store with reactive state
export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isLoading = ref(false)

  const login = async (credentials) => {
    isLoading.value = true
    try {
      const response = await AuthService.login(credentials)
      user.value = response.user
      return response
    }
    finally {
      isLoading.value = false
    }
  }

  return { user, isLoading, login }
})
```

### Benefits of Simple Approach

- **Easy to Understand** - Straightforward reactive patterns
- **No External Dependencies** - Uses only Pinia core functionality
- **Direct Control** - Full visibility into state management
- **Simple Debugging** - Easy to trace data flow
- **Fast Development** - Quick to implement and modify

## 🎨 UI Components

Uses shadcn/vue components with Tailwind CSS:

```vue
<template>
  <Card class="w-full max-w-md">
    <CardHeader>
      <CardTitle>Login</CardTitle>
    </CardHeader>
    <CardContent>
      <FormField v-slot="{ componentField }" name="email">
        <FormLabel for="email">
          Email
        </FormLabel>
        <FormControl>
          <Input
            id="email"
            v-bind="componentField"
            type="email"
            placeholder="Enter your email"
            autocomplete="email"
          />
        </FormControl>
        <FormMessage />
      </FormField>
    </CardContent>
  </Card>
</template>
```

## 🚀 Getting Started

### Prerequisites

- Bun (preferred) or Node.js
- Vue 3 knowledge
- TypeScript familiarity

### Installation

```bash
# Install dependencies
bun install

# Run development server
bun run dev

# Build for production
bun run build
```

### Configuration

1. Update API endpoints in `src/api/client.ts`
2. Modify authentication logic in `src/features/auth/services/auth-service.ts`
3. Customize UI components and styling as needed

## 📁 Feature Structure

Each feature follows this structure:

```
feature/
├── components/     # Feature-specific Vue components
├── composables/    # Feature-specific composables
├── schemas/        # Zod validation schemas
├── services/       # Business logic and API calls
├── stores/         # Feature-specific Pinia stores
├── types/          # TypeScript type definitions
└── index.ts        # Public API exports
```

### Schema Organization Benefits

- **Separation of Concerns**: Schemas and types are clearly separated
- **Reusability**: Shared schemas available across features
- **Centralized Access**: Import schemas from `@/schemas` or `@/types`
- **Type Safety**: Full TypeScript integration with Zod inference
- **Maintainability**: Easy to find and update validation logic

## 🔧 Development Guidelines

### Adding New Features

1. Create feature directory under `src/features/`
2. Add components, composables, services as needed
3. Create Pinia store in `stores/` subdirectory
4. Define types with Zod schemas
5. Export public API through `index.ts`
6. Add routes in `src/pages/`

### State Management Best Practices

- Use simple Pinia stores with composition API
- Keep stores focused on specific features
- Use computed properties for derived state
- Handle loading and error states explicitly
- Initialize state from localStorage when needed

### Best Practices

- Use TypeScript for everything
- Define Zod schemas for all data structures
- Use composition API with `<script setup>`
- Keep components focused and reusable
- Use simple Pinia patterns for state management
- Follow the feature-based organization

## 🧪 Testing

- Unit tests with Vitest
- E2E tests with Cypress
- Component testing with Vue Test Utils

## 📦 Build & Deployment

Uses Vite for fast builds and hot reload during development.

```bash
# Development
bun run dev

# Production build
bun run build

# Preview production build
bun run preview
```

## 🎯 Next Steps

1. **Route Guards** - Implement authentication-based route protection
2. **Error Boundaries** - Add global error handling
3. **Internationalization** - Add multi-language support
4. **PWA Features** - Add offline capabilities
5. **Testing** - Expand test coverage
6. **API Integration** - Connect to real backend services
7. **Data Caching** - Add client-side caching strategies if needed

This setup provides a solid foundation for building scalable Vue 3 applications with modern development practices, simple state management, and excellent developer experience. The straightforward approach makes it easy for developers to understand, maintain, and extend the application.

# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Manager
This project uses **Bun** as the package manager and runtime.

```bash
# Install dependencies
bun install

# Development server with hot reload
bun dev

# Build for production
bun run build

# Preview production build
bun run preview
```

### Testing
```bash
# Run unit tests (Vitest)
bun test:unit

# Run E2E tests in development mode (Cypress)
bun test:e2e:dev

# Run E2E tests against production build
bun test:e2e
```

### Code Quality
```bash
# Run ESLint with zero warnings policy
bun lint

# Fix ESLint issues automatically
bun lint:fix

# Type checking
bun run type-check
```

### Utilities
```bash
# Clean build artifacts
bun run clean:dist

# Clean node_modules
bun run clean:deps

# Clean everything
bun run clean
```

## Architecture Overview

### Tech Stack
- **Vue 3** with Composition API and TypeScript
- **Vite** (using Rolldown) for build tooling
- **Bun** as package manager and runtime
- **Vue Router** with file-based routing (unplugin-vue-router)
- **Pinia** for state management
- **Tailwind CSS** v4 for styling
- **Reka UI** component library (Shadcn/ui for Vue)
- **Vitest** for unit testing, **Cypress** for E2E testing

### Feature-Sliced Design (FSD) Architecture

This project follows **Feature-Sliced Design** principles for scalable application structure:

```
src/
├── app/                    # Application layer
│   ├── providers/          # Global providers (router, store)
│   ├── styles/            # Global styles
│   └── main.ts            # Application entry point
├── pages/                 # Pages layer (routing)
│   ├── auth/              # Authentication pages
│   ├── dashboard.vue      # Dashboard page
│   ├── index.vue          # Home page
│   └── about.vue          # About page
├── widgets/               # Widgets layer (complex UI blocks)
│   ├── header/            # Header widget
│   ├── footer/            # Footer widget
│   ├── default-layout.vue # Default layout
│   ├── auth-layout.vue    # Authentication layout
│   └── dashboard-layout.vue # Dashboard layout
├── features/              # Features layer (business logic)
│   ├── auth/              # Authentication feature
│   ├── user-profile/      # User profile management
│   └── counter/           # Counter demo feature
├── entities/              # Entities layer (business entities)
│   ├── user/              # User entity
│   └── product/           # Product entity
├── shared/                # Shared layer (reusable code)
│   ├── api/               # API client
│   ├── composables/       # Shared composables
│   ├── lib/               # Utility functions
│   ├── ui/                # Reusable UI components
│   ├── types/             # TypeScript types
│   └── config/            # Configuration
└── assets/                # Static assets
```

### FSD Layer Structure

Each feature/entity follows this internal structure:
```
features/auth/
├── api/                   # API calls and external data
├── lib/                   # Business logic and utilities
├── model/                 # State management (Pinia stores)
├── ui/                    # Feature-specific UI components
├── config/                # Feature configuration
└── index.ts               # Public API (barrel export)
```

### Key Features

#### File-Based Routing
- Routes are automatically generated from files in `src/pages/`
- Route metadata can be defined using `<route>` blocks with YAML frontmatter
- Layout selection is controlled via route metadata (`meta.layout`)

#### Dynamic Layout System
- Multiple layouts: `default`, `auth`, `dashboard`
- Layouts are defined in `src/widgets/`
- Layout switching based on route metadata in `app.vue`

#### Component System
- **Shared UI**: Reusable components in `src/shared/ui/`
- **Feature UI**: Feature-specific components in `features/*/ui/`
- **Widget UI**: Complex UI blocks in `src/widgets/`
- Uses Reka UI (Shadcn/ui port) for consistent component design

#### State Management
- **Feature Stores**: Each feature has its own Pinia store in `model/`
- **Entity Stores**: Business entities have their own state management
- **Shared Stores**: Global state in `app/providers/`
- All stores use Composition API pattern

#### API Layer
- **Shared API Client**: Generic HTTP client in `src/shared/api/`
- **Feature APIs**: Feature-specific API calls in `features/*/api/`
- **Entity APIs**: Business entity APIs in `entities/*/api/`

#### Type Safety
- **Shared Types**: Common interfaces in `src/shared/types/`
- **Feature Types**: Feature-specific types exported from feature APIs
- **Entity Types**: Business entity types

### Development Guidelines

#### Adding New Features
1. Create feature directory: `src/features/feature-name/`
2. Add feature structure: `api/`, `lib/`, `model/`, `ui/`, `config/`
3. Implement feature components and logic
4. Export public API via `index.ts`
5. Import and use in pages or other features

#### Adding New Entities
1. Create entity directory: `src/entities/entity-name/`
2. Add entity structure: `api/`, `lib/`, `model/`, `ui/`
3. Implement entity components and logic
4. Export public API via `index.ts`

#### Adding New Widgets
1. Create widget component in `src/widgets/`
2. Add to barrel export if reusable
3. Use widgets in layouts or pages

#### Import Rules
- **Strict layer imports**: Lower layers cannot import from higher layers
- **Feature isolation**: Features should not directly import from other features
- **Shared layer**: Can be imported by any layer
- **Public APIs**: Use barrel exports (`index.ts`) for clean imports

#### File Naming
- Use kebab-case for files and directories
- Component files: `component-name.vue`
- Store files: `use-store-name.ts` or `index.ts` in model/
- API files: `api-name.ts` or `index.ts` in api/

### Development Notes

#### Build System
- Uses Vite with Rolldown for faster builds
- Vue DevTools configured with Cursor editor integration
- Path aliases: `@/*` maps to `src/*`

#### Linting & Code Quality
- ESLint with Antfu's config and strict rules
- Zero warnings policy enforced
- Filename case enforced (kebab-case)
- Better Tailwind CSS plugin for class validation
- Husky + lint-staged for pre-commit hooks

#### TypeScript Configuration
- Project references setup with separate configs for app, node, and vitest
- Vue language plugin for Pug support included
- Generated router types in `typed-router.d.ts`

#### Testing Strategy
- Unit tests with Vitest and Vue Test Utils
- E2E tests with Cypress
- Tests can run against both development and production builds

### Examples

#### Using Features
```vue
<script setup lang="ts">
// Import from feature public API
import { LoginForm, useAuthStore } from '@/features/auth'
import { CounterDisplay } from '@/features/counter'

const authStore = useAuthStore()
</script>
```

#### Using Entities
```vue
<script setup lang="ts">
// Import from entity public API
import { UserCard, useUserEntityStore } from '@/entities/user'

const userStore = useUserEntityStore()
</script>
```

#### Using Shared Resources
```vue
<script setup lang="ts">
// Import from shared layer
import { Button } from '@/shared/ui'
import { useApi, useTheme } from '@/shared/composables'
import type { User, ApiResponse } from '@/shared/types'
</script>
```
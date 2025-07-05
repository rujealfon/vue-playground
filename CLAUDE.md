# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

Uses Bun as the primary package manager and runtime.

### Development Server
```bash
bun run dev
```

### Building
```bash
bun run build         # Type-check and build for production
bun run build-only    # Build without type checking
```

### Testing
```bash
bun run test:unit               # Run unit tests with Vitest
bun run test:e2e:dev           # Run Cypress e2e tests in dev mode
bun run test:e2e               # Run Cypress e2e tests against production build
```

### Linting and Type Checking
```bash
bun run lint          # Lint with ESLint (max 0 warnings)
bun run lint:fix      # Auto-fix linting issues
bun run type-check    # Type check with vue-tsc
```

### Cleaning
```bash
bun run clean         # Clean dist and node_modules
bun run clean:dist    # Clean dist directory only
bun run clean:deps    # Clean node_modules only
```

## Project Architecture

### Tech Stack
- **Framework**: Vue 3 with TypeScript and Composition API
- **Build Tool**: Vite (using rolldown-vite variant)
- **Styling**: Tailwind CSS v4 with `@tailwindcss/vite` plugin
- **State Management**: Pinia with domain-organized stores
- **Routing**: Vue Router with unplugin-vue-router for file-based routing
- **UI Components**: Reka UI with shadcn-vue styling system
- **Form Validation**: vee-validate + Zod for type-safe validation
- **Architecture**: Atomic Design principles
- **Testing**: Vitest for unit tests, Cypress for e2e tests

### Atomic Design Structure

The project follows atomic design methodology with a clear component hierarchy:

#### Atoms (`src/components/atomic/atoms/`)
Basic building blocks and UI elements:
- **UI**: Barrel exports for shadcn-vue components (`@atoms/ui`)
- **Text**: Typography components (Heading, Paragraph)
- **Form**: Basic form elements (FormField)

#### Molecules (`src/components/atomic/molecules/`)
Simple component groups:
- **Forms**: LoginForm, RegisterForm with vee-validate integration
- **Navigation**: NavLink component
- **Hero**: HeroSection for landing pages

#### Organisms (`src/components/atomic/organisms/`)
Complex component groups:
- **Auth**: LoginCard, RegisterCard with full authentication flow
- **Header**: SiteHeader with navigation and auth state
- **Footer**: SiteFooter with links and branding

#### Pages (`src/components/pages/`)
Complete page views using atomic components:
- **index.vue**: Home page with hero and counter demo
- **about.vue**: About page with auth integration
- **login.vue**: Authentication login page
- **register.vue**: User registration page

### State Management Architecture

Domain-organized Pinia stores in `src/stores/domains/`:

#### App Domain (`stores/domains/app/`)
- **counter.store.ts**: Demo counter with increment functionality

#### Auth Domain (`stores/domains/auth/`)
- **auth.store.ts**: User authentication, login/register/logout, token management

#### UI Domain (`stores/domains/ui/`)
- **theme.store.ts**: Theme switching (light/dark/system)
- **navigation.store.ts**: Navigation state and mobile menu

#### User Domain (`stores/domains/user/`)
- **user.store.ts**: User data management and CRUD operations

### API Architecture

Comprehensive API layer in `src/api/`:

#### Services (`api/services/`)
- **auth.service.ts**: Authentication API calls (login, register, logout)
- HTTP client with interceptors for auth and error handling

#### Types (`api/types/`)
- **auth.types.ts**: Authentication-related TypeScript interfaces
- **common.types.ts**: Shared API types and response formats

#### Composables (`api/composables/`)
- **useApi.ts**: Base composable for API calls with loading/error states
- **useAuth.ts**: Authentication-specific composables

### Form Validation System

Type-safe form validation using Zod schemas in `src/schemas/`:
- **auth.schemas.ts**: Login and registration validation schemas
- Integration with vee-validate for reactive form validation
- Error handling and field-level validation feedback

### Key Configuration Details

#### Path Aliases
- `@atoms`: `@/components/atomic/atoms`
- `@molecules`: `@/components/atomic/molecules`
- `@organisms`: `@/components/atomic/organisms`
- `@/stores`: Domain-organized Pinia stores
- `@/api`: API services and composables
- `@/schemas`: Zod validation schemas

#### Routing
- File-based routing from `src/components/pages/`
- Routes: `/`, `/about`, `/login`, `/register`
- Auth-aware navigation with protected routes capability

#### Styling System
- Tailwind CSS v4 with CSS variables enabled
- Base color scheme: Stone
- CSS entry point: `src/assets/main.css`
- Utility function `cn()` for class merging (clsx + tailwind-merge)
- shadcn-vue components with atomic design integration

#### Component Integration Patterns
- **Atoms**: Pure UI components, minimal logic
- **Molecules**: Combine atoms, handle local state
- **Organisms**: Complex logic, API integration, store consumption
- **Pages**: Route-level components, orchestrate organisms

#### ESLint Configuration
- Uses @antfu/eslint-config as base
- TypeScript and Vue support enabled
- A11y rules enabled for Vue components
- Strict rules: max 0 warnings, kebab-case filenames
- UI components (`src/components/ui/`) ignored from linting

### Development Patterns

#### Authentication Flow
1. Forms use vee-validate + Zod for validation
2. Auth organisms handle API calls via auth store
3. Store manages tokens and user state
4. Navigation updates based on auth state

#### Component Development
1. Start with atoms for basic UI elements
2. Combine atoms into molecules for functionality
3. Build organisms for complex features
4. Compose pages from organisms

#### State Management
1. Domain-based store organization
2. Stores consume API composables
3. Components consume stores
4. Reactive updates throughout component tree

### Development Environment
- Uses Bun as package manager and runtime
- Vite dev tools enabled with Cursor integration
- Husky for git hooks with lint-staged
- Pre-commit linting configured for JS/TS/Vue files
- Hot module replacement for atomic components
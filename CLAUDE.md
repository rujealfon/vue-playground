# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

### Package Management
- `bun install` - Install dependencies
- `bun dev` - Start development server with hot reload
- `bun run build` - Build for production (includes type checking)
- `bun run preview` - Preview production build locally

### Testing
- `bun test:unit` - Run unit tests with Vitest
- `bun test:e2e:dev` - Run Cypress E2E tests in development mode
- `bun test:e2e` - Run Cypress E2E tests against production build

### Code Quality
- `bun lint` - Run ESLint with zero warnings tolerance
- `bun lint:fix` - Fix ESLint issues automatically
- `bun run type-check` - Run TypeScript type checking with vue-tsc

### Utilities
- `bun run clean` - Clean both dist and node_modules
- `bun run clean:dist` - Remove build artifacts
- `bun run clean:deps` - Remove node_modules

## Architecture Overview

### Framework Stack
- **Vue 3** with Composition API
- **Vite** (using Rolldown) for build tooling
- **TypeScript** with strict type checking
- **Pinia** for state management
- **Vue Router** with file-based routing via `unplugin-vue-router`
- **Tailwind CSS** v4 for styling

### Feature-Sliced Design (FSD) Architecture

This project follows Feature-Sliced Design principles with the following layer structure:

#### Layer Hierarchy (top to bottom)
1. **`src/app/`** - Application initialization and global providers
   - `providers/` - Global providers (router, pinia)
   - `styles/` - Global styles (main.css)

2. **`src/pages/`** - Route-level components
   - File-based routing with `unplugin-vue-router`
   - Each page can import from lower layers
   - Route files in root, page components in subdirectories

3. **`src/widgets/`** - Composite UI components
   - Complex reusable components that combine multiple features
   - Example: `welcome-section/` for the homepage welcome area

4. **`src/features/`** - Business logic features
   - Self-contained feature implementations
   - Example: `counter/` with UI components and business logic

5. **`src/entities/`** - Business entities and models
   - Data models, stores, and entity-related logic
   - Example: `counter/model.ts` with Pinia store

6. **`src/shared/`** - Shared utilities and UI components
   - `ui/` - Reusable UI components (buttons, icons)
   - `lib/` - Utility functions and helpers

#### FSD Import Rules
- Each layer can only import from layers below it
- Same-level imports are prohibited
- All modules must have a public API via `index.ts`
- No direct imports to internal module files

#### Public API Pattern
- Each slice exports its public API via `index.ts`
- Example: `@/features/counter` exports `CounterDisplay` component
- Example: `@/features/auth-login` exports `LoginForm` component and `useLoginForm` composable
- Example: `@/shared/ui` exports `Button`, `Input`, `Card` and icon components
- Example: `@/entities/user` exports `useUserStore` and user types

#### Authentication System
This project includes a complete authentication system following FSD principles:

**Entities Layer:**
- `@/entities/user` - User model, types, and Pinia store with auth state

**Features Layer:**
- `@/features/auth-login` - Login form component and validation logic
- `@/features/auth-register` - Registration form component and validation logic

**Pages Layer:**
- `/login` - Login page with form and error handling
- `/register` - Registration page with form and validation

**Widgets Layer:**
- `@/widgets/auth-widget` - Navigation component with login/logout buttons

**Shared Layer:**
- `@/shared/api/auth` - Mock authentication API with login, register, and token validation
- `@/shared/ui` - Form components (`Input`, `Card`) used by auth features

**App Layer:**
- `@/app/providers/auth` - Auth initialization and route guards
- Auto-initialization of authentication state on app startup

**Demo Credentials:**
- Email: `demo@example.com`
- Password: `password123`

**Key Features:**
- Form validation with real-time error feedback
- JWT-like token storage in localStorage
- Automatic auth state persistence
- Mock API with simulated network delays
- Responsive design with Tailwind CSS

### Development Tools
- **ESLint** with @antfu/eslint-config (strict setup)
- **Vitest** for unit testing with jsdom environment
- **Cypress** for E2E testing
- **Vue DevTools** configured for Cursor editor
- **Husky** with lint-staged for pre-commit hooks

### TypeScript Configuration
- Project references architecture with separate configs:
  - `tsconfig.app.json` - App-specific settings
  - `tsconfig.node.json` - Node/build tool settings
  - `tsconfig.vitest.json` - Test environment settings
- Path alias: `@/` maps to `src/`

## Important Notes

### Linting Rules
- Zero warnings policy (`--max-warnings 0`)
- Kebab-case filenames enforced
- No process.env usage (use node/no-process-env)
- Consistent type definitions (prefer `type` over `interface`)
- Tailwind class ordering enforced
- Import sorting configured for FSD layer structure

### Ignored Files
- `src/components/ui/**/*` - Legacy UI components (shadcn/ui style)
- `src/shared/ui/**/*` - Shared UI components (excluded from linting)
- `typed-router.d.ts` - Auto-generated router types
- `**/*.md` - Markdown files

### Runtime Environment
- Uses Bun as the primary runtime
- Vite commands prefixed with `bunx --bun`
- Fast development server with HMR
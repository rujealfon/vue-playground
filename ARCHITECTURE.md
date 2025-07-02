# Project Architecture Plan: A Scalable Vue.js Application

This document outlines the plan to refactor the project into a scalable, maintainable, and feature-based architecture. The goal is to establish clear patterns for code organization, state management, and data fetching that will support the application's growth.

## 1. Core Principles

Our architecture is built on three core principles:

1.  **Feature-Based Modules**: Code is organized by domain or feature (e.g., `auth`, `welcome`) rather than by type (e.g., all components in one folder). This improves collocation and makes features easier to manage independently.
2.  **Clear Separation of Concerns**: We maintain a strict separation between different parts of the application:
    *   `src/pages`: Contains only routable, top-level page components.
    *   `src/features`: Contains the business logic, components, and state related to a specific domain.
    *   `src/shared`: Contains truly generic, reusable code and components used across multiple features (e.g., UI primitives, utility functions).
    *   `src/lib`: Contains core libraries and application-wide singletons, like the API client.
3.  **Layered Architecture within Features**: Each feature follows a consistent internal structure to separate presentation, business logic, and data fetching.
    *   **Components**: The UI layer (Vue components).
    *   **Composables**: The state and business logic layer.
    *   **API**: The data-fetching layer, responsible for communication with the backend.

## 2. Technology Stack

We will leverage a modern and robust set of tools:

*   **Framework**: Vue.js 3 with Composition API
*   **Build Tool**: Vite
*   **Routing**: `unplugin-vue-router` for file-based routing
*   **State Management**: Pinia
*   **Data Fetching**: `ofetch` for a simple and powerful HTTP client
*   **Forms**:
    *   `shadcn-vue` for accessible and unstyled UI components
    *   `vee-validate` for form state management
    *   `zod` for schema-based validation

## 3. Target Directory Structure

The final project structure will be as follows:

```
vue-playground/
├── src/
│   ├── app.vue
│   ├── assets/
│   ├── features/
│   │   ├── auth/
│   │   │   ├── api/
│   │   │   │   └── index.ts            # Handles login and register API calls
│   │   │   ├── components/
│   │   │   │   ├── login-form.vue
│   │   │   │   └── register-form.vue
│   │   │   ├── composables/
│   │   │   │   └── use-auth.ts         # Provides login() & register() functions
│   │   │   ├── schemas/
│   │   │   │   └── index.ts            # Zod schemas for login and register
│   │   │   └── stores/
│   │   │       └── auth.ts             # Manages auth token and user state
│   │   └── welcome/
│   │       └── ...
│   ├── lib/
│   │   ├── api.ts                   # Global ofetch instance with interceptors
│   │   └── utils.ts                 # shadcn-vue helper functions
│   ├── pages/
│   │   ├── index.vue
│   │   ├── about.vue
│   │   ├── login.vue
│   │   └── register.vue
│   ├── router/
│   │   └── index.ts
│   ├── shared/
│   │   ├── components/
│   │   │   ├── icons/
│   │   │   └── ui/                  # Shared shadcn-vue components
│   │   └── utils/
│   ├── stores/                      # Global Pinia stores
│   └── main.ts
├── ARCHITECTURE.md                  # This file
└── ... (other project files)
```

## 4. Implementation Steps

1.  **Install Dependencies**: Add `ofetch`, `vee-validate`, `@vee-validate/zod`, and the required `shadcn-vue` components.
2.  **Create Global API Client**: Implement a global `ofetch` instance at `src/lib/api.ts`.
3.  **Refactor Existing Code**: Move original components into `features/welcome` or `shared` directories.
4.  **Implement Features**: Build out the `auth` and `welcome` features using the layered structure (API, Composables, Components).
5.  **Build Pages**: Create pages that consume the feature components.
6.  **Cleanup**: Ensure all old files and directories are removed.
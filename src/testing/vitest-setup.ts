/// <reference types="vitest/globals" />
import { afterAll, afterEach, beforeAll } from 'vitest'

import { server } from './msw-setup'

// Start server before all tests
beforeAll(() => server.listen())

// Reset handlers after each test
afterEach(() => server.resetHandlers())

// Stop server after all tests
afterAll(() => server.close())

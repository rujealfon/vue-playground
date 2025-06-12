import pluginVitest from '@vitest/eslint-plugin'
import { defineConfigWithVueTs, vueTsConfigs } from '@vue/eslint-config-typescript'
import pluginVue from 'eslint-plugin-vue'
import { globalIgnores } from 'eslint/config'
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import skipFormatting from '@vue/eslint-config-prettier/skip-formatting'
// @ts-expect-error - no types available for eslint-plugin-cypress/flat
import pluginCypress from 'eslint-plugin-cypress/flat'
// @ts-expect-error - no types available for eslint-plugin-import
import pluginImport from 'eslint-plugin-import'
import pluginOxlint from 'eslint-plugin-oxlint'

// To allow more languages other than `ts` in `.vue` files, uncomment the following lines:
// import { configureVueProject } from '@vue/eslint-config-typescript'
// configureVueProject({ scriptLangs: ['ts', 'tsx'] })
// More info at https://github.com/vuejs/eslint-config-typescript/#advanced-setup

export default defineConfigWithVueTs(
  {
    name: 'app/files-to-lint',
    files: ['**/*.{ts,mts,tsx,vue}'],
  },

  globalIgnores(['**/dist/**', '**/dist-ssr/**', '**/coverage/**', 'typed-router.d.ts']),

  pluginVue.configs['flat/recommended'],
  vueTsConfigs.recommended,

  {
    ...pluginVitest.configs.recommended,
    files: ['src/**/__tests__/*'],
  },

  {
    ...pluginCypress.configs.recommended,
    files: ['cypress/e2e/**/*.{cy,spec}.{js,ts,jsx,tsx}', 'cypress/support/**/*.{js,ts,jsx,tsx}'],
  },

  // Import rules configuration
  {
    name: 'import-rules',
    files: ['src/**/*.{ts,vue}'],
    plugins: {
      import: pluginImport,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
          project: './tsconfig.app.json',
        },
        alias: {
          map: [['@', './src']],
          extensions: ['.ts', '.vue', '.js'],
        },
      },
    },
    rules: {
      // Enforce using @ alias instead of relative imports for src files
      'import/no-relative-packages': 'error',
      // Custom rule to prefer @ alias
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: [
                './components/*',
                './views/*',
                './stores/*',
                './router/*',
                './assets/*',
                './utils/*',
              ],
              message:
                'Use @ alias instead of relative imports. Example: use "@/components/..." instead of "./components/..."',
            },
            {
              group: [
                '../components/*',
                '../views/*',
                '../stores/*',
                '../router/*',
                '../assets/*',
                '../utils/*',
              ],
              message:
                'Use @ alias instead of relative imports. Example: use "@/components/..." instead of "../components/..."',
            },
          ],
        },
      ],
    },
  },

  // UI Components exceptions - allow single-word names for shadcn/ui components
  {
    name: 'ui-components-exceptions',
    files: ['src/pages/**/*.vue', 'src/components/ui/**/*.vue'],
    rules: {
      // Allow single-word component names for UI components (shadcn/ui pattern)
      'vue/multi-word-component-names': 'off',
      // Allow props without defaults for UI components (they often use TypeScript defaults)
      'vue/require-default-prop': 'off',
    },
  },

  ...pluginOxlint.configs['flat/recommended'],
  skipFormatting,
)

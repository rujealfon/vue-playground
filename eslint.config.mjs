import antfu from '@antfu/eslint-config'
import eslintPluginBetterTailwindcss from 'eslint-plugin-better-tailwindcss'
// https://github.com/antfu/eslint-config/issues/631#issuecomment-2965427766
// import eslintPluginOxlint from 'eslint-plugin-oxlint'

export default antfu(
  {
    vue: true,
    typescript: true,
    formatters: {
      css: true,
      html: true,
      markdown: 'prettier',
    },
    // Disable UnoCSS since we're using Tailwind CSS
    unocss: false,
    ignores: [
      // Ignore UI components from all linting and formatting
      'src/shared/components/ui/**/*',
    ],
  },
  {
    // Global rules
    rules: {
      'ts/no-redeclare': 'off',
      'ts/consistent-type-definitions': ['error', 'type'],
      'no-console': ['warn'],
      'antfu/no-top-level-await': 'off',
      'node/prefer-global/process': 'off',
      'node/no-process-env': ['error'],
      'perfectionist/sort-imports': ['error', {
        tsconfigRootDir: '.',
      }],
      'unicorn/filename-case': ['error', {
        case: 'kebabCase',
        ignore: ['README.md'],
      }],
    },
  },
  // MUST be after global rules to override
  {
    // Better Tailwind CSS plugin
    plugins: {
      'better-tailwindcss': eslintPluginBetterTailwindcss,
    },
    rules: {
      // Better Tailwind CSS rules
      ...eslintPluginBetterTailwindcss.configs['recommended-error'].rules,
      'better-tailwindcss/no-unregistered-classes': 'off',
    },
    settings: {
      'better-tailwindcss': {
        entryPoint: 'src/assets/main.css',
      },
    },
  },
  // eslintPluginOxlint.configs['flat/recommended'],
)

module.exports = {
    extends: [
      'eslint:recommended',
      'plugin:svelte3/recommended',
      'prettier',
    ],
    plugins: ['svelte3'],
    overrides: [
      {
        files: ['*.svelte'],
        processor: 'svelte3/svelte3',
      },
    ],
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
    },
    env: {
      browser: true,
      es2020: true,
    },
    rules: {
      // Add custom rules here
    },
    settings: {
      'svelte3/typescript': true,
      'svelte3/ignore-styles': () => true,
    },
  };
  
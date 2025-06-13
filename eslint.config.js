import js from '@eslint/js';

import globals from 'globals';

import { defineConfig } from 'eslint/config';





export default defineConfig([

    { files: ['**/*.{js,mjs,cjs}'], plugins: { js }, extends: ['js/recommended'] },

    { files: ['**/*.{js,mjs,cjs}'], languageOptions: { globals: globals.browser } },

    {

        files: ['**/*.js'],

        languageOptions: {

            globals: {

                ...globals.browser

            }

        },

        rules: {

            'indent': ['error', 4],

            'linebreak-style': ['error', 'windows'],

            'quotes': ['error', 'single'],

            'semi': ['error', 'always'],

            'max-len': ['error', { 'code': 100 }],

            'comma-dangle': ['error', 'never'],

            'arrow-parens': ['error', 'always'],

            'brace-style': ['error', '1tbs'],

            'space-before-function-paren': ['error', 'always']

        }

    }

]);


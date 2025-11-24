import js from "@eslint/js";
import globals from "globals";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";
import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: [
      "**/*.config.js",
      "**/webpack.*.js",
      "**/node_modules/**",
      "**/dist/**",
      "!**/eslint.config.js",
    ],
  },
  {
    files: ["**/*.{js,mjs,cjs,jsx}"],
    languageOptions: {
      globals: {
        ...globals.browser,
        ...globals.jest,
      },
    },
    plugins: {
      react: pluginReact,
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "warn",
      "react/react-in-jsx-scope": "off",
    },
    extends: [
      js.configs.recommended,
      pluginReact.configs.flat.recommended,
      eslintConfigPrettier,
    ],
  },
]);
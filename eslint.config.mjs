import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import blog2Plugin from "eslint-plugin-blog2-plugin";
import pluginReact from "eslint-plugin-react";
import { defineConfig, globalIgnores } from "eslint/config";
import i18next from "eslint-plugin-i18next";
import reactHooks from "eslint-plugin-react-hooks";

export default defineConfig([
  globalIgnores(["./node_modules/*", "./build/*", "./scripts/*"]),
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: { js },
    extends: ["js/recommended"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    languageOptions: { globals: globals.browser },
  },
  {
    plugins: {
      blog2Plugin,
    },
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "blog2Plugin/path-checker": [
        "error",
        {
          alias: "@",
        },
      ],
      "blog2Plugin/public-api-imports": [
        "error",
        {
          alias: "@",
        },
      ],
    },
  },
  tseslint.configs.recommended,
  pluginReact.configs.flat.recommended,
  i18next.configs["flat/recommended"],
  reactHooks.configs["recommended-latest"],
  {
    settings: {
      react: {
        version: "detect",
      },
    },
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "i18next/no-literal-string": [
        "error",
        { markupOnly: true, ignoreAttribute: ["data-testid"] },
      ],
    },
  },
]);

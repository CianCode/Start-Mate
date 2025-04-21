import { FlatCompat } from "@eslint/eslintrc";
import { dirname } from "path";
import { fileURLToPath } from "url";

// 📍 Determine file paths
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// 🛠️ Setup ESLint config compatibility for Flat config
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// 🧠 ESLint Configuration
const eslintConfig = [
  ...compat.config({
    // 📦 Extends base configs
    extends: [
      "next",
      "next/core-web-vitals",
      "next/typescript",
      "plugin:prettier/recommended",
    ],

    // 🔌 Plugins
    plugins: ["prettier", "check-file", "unused-imports"],

    // 📏 Rules
    rules: {
      // 💅 Prettier integration
      "prettier/prettier": [
        "error",
        {
          trailingComma: "all",
          semi: true,
          tabWidth: 2,
          singleQuote: false,
          bracketSpacing: true,
          importOrder: [
            "^(react|next?/?([a-zA-Z/]*))$", // 🟦 React & Next.js
            "<THIRD_PARTY_MODULES>", // 📦 Third-party modules
            "^@/(.*)$", // 📁 Absolute imports
            "^[./]", // 📄 Relative imports
          ],
          importOrderSeparation: true,
          importOrderSortSpecifiers: true,
          plugins: [
            "@trivago/prettier-plugin-sort-imports",
            "prettier-plugin-tailwindcss",
          ],
        },
        {
          usePrettierrc: false,
        },
      ],

      // 🏹 Arrow functions preference
      "prefer-arrow-callback": "error",

      // 🧩 Prefer template literals over string concatenation
      "prefer-template": "error",

      // 📛 File naming convention
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],

      // 🗂️ Folder naming convention
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!(__tests__)": "KEBAB_CASE",
        },
      ],

      // 🚫 Remove unused imports
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "warn",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_",
        },
      ],
    },
  }),
];

export default eslintConfig;

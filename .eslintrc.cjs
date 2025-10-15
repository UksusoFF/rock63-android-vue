module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/typescript/recommended",
    "@vue/eslint-config-prettier",
  ],
  plugins: ["simple-import-sort", "import", "filename-rules"],
  parserOptions: {
    ecmaVersion: 2020,
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    "vue/no-deprecated-slot-attribute": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "one-var": ["error", "never"],
    "simple-import-sort/imports": ["error"],
    "import/newline-after-import": "error",
    "filename-rules/match": [2, { ".vue": "PascalCase", ".ts": "camelCase" }],
    "vue/block-order": [
      "error",
      {
        order: ["template", "script", "style"],
      },
    ],
  },
};

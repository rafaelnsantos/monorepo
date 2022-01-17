/** @type {import('eslint').Linter.Config} */
module.exports = {
  extends: ["next", "plugin:prettier/recommended", "plugin:testing-library/react"],
  settings: {
    next: {
      rootDir: ["apps/*/", "packages/*/"],
    },
  },
  rules: {
    "@next/next/no-html-link-for-pages": "off",
  },
};

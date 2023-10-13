// eslint-disable-next-line no-undef
module.exports = {
  overrides: [
    {
      files: ["*.ts", "*.tsx"],
      rules: {
        "simple-import-sort/imports": [
          "error",
          {
            groups: [
              // Packages `react` related packages come first.
              ["^react", "^@?\\w"],
              // Internal packages.
              ["^(@|components)(/.*|$)"],
              // Side effect imports.
              ["^\\u0000"],
              // Parent imports. Put `..` last.
              ["^\\.\\.(?!/?$)", "^\\.\\./?$"],
              // Other relative imports. Put same-folder imports and `.` last.
              ["^\\./(?=.*/)(?!/?$)", "^\\.(?!/?$)", "^\\./?$"],
              // Style imports.
              ["^.+\\.?(css)$"],
            ],
          },
        ],
      },
    },
    {
      files: ["*.tsx"],
      rules: {
        "@next/next/no-img-element": "off",
      },
    },
  ],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
    "plugin:react-hooks/recommended",
    "plugin:import/typescript",
    "plugin:prettier/recommended",
    "plugin:react/jsx-runtime",
  ],
  env: {
    browser: true,
  },
  ignorePatterns: ["next-env.d.ts", "**/*.css", "**/*.scss", "_server.ts"],
  rules: {
    "no-cond-assign": "error",
    "no-constant-condition": "error",
    "no-unreachable": "error",
    "no-constant-binary-expression": "error",
    "no-sequences": "error",
    "react-hooks/exhaustive-deps": "off",
    "react/jsx-uses-react": "off",
    "react/react-in-jsx-scope": "off",
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "off",
    "no-underscore-dangle": "warn",
    "@typescript-eslint/explicit-function-return-type": [
      "off",
      {
        allowTypedFunctionExpressions: true,
        allowHigherOrderFunctions: true,
      },
    ],
    "@typescript-eslint/no-empty-function": "off",
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-object-literal-type-assertion": "off",
    "@typescript-eslint/interface-name-prefix": "off",
    "jsx-a11y/media-has-caption": "off",
    "import/no-unresolved": "off",
    "react/function-component-definition": "off",
    "import/extensions": "off",
    "jsx-quotes": ["error", "prefer-double"],
    "max-len": [
      "error",
      {
        code: 120,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
        ignoreStrings: true,
        ignoreTemplateLiterals: true,
        ignoreRegExpLiterals: true,
      },
    ],
    "max-lines": ["warn", 400],
    "no-console": "off",
    "no-shadow": "off",
    "object-curly-spacing": [
      "error",
      "always",
      {
        arraysInObjects: true,
      },
    ],
    "react/jsx-filename-extension": ["error", { extensions: [".ts", ".tsx"] }],
    "react/jsx-props-no-spreading": "off",
    "react/prop-types": "off",
    "require-jsdoc": "off",
    "import/prefer-default-export": "off",
    "simple-import-sort/imports": "error",
    "simple-import-sort/exports": "error",
  },
  plugins: [
    "prettier",
    "@typescript-eslint",
    "react",
    "react-hooks",
    "simple-import-sort",
  ],
};

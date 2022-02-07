module.exports = {
  "parser": "@typescript-eslint/parser",
  "plugins": [
    "@typescript-eslint",
    "react"
  ],
  "extends": [
    "eslint:recommended"
  ],
  "parserOptions": {
    "ecmaFeatures": {
      "legacyDecorators": true
    }
  },
  "env": {
    "browser": true,
    "node": true,
    "jest": true,
    "es6": true
  },
  "rules": {
    "no-alert": "error",
    "no-debugger": "error",
    "no-console": [ "error", { "allow": [ "info", "warn", "error" ] } ],
    "linebreak-style": [ 2, "unix" ],
    "semi": [ "error", "never" ],
    "indent": [ "error", 2, { "VariableDeclarator": { "var": 2, "let": 2, "const": 3 } } ],
    "id-length": [ 2, { "min": 2, "properties": "never", "exceptions": [ "a", "b", "c", "d", "e", "h", "i", "j", "k", "n", "r", "w", "x", "y", "z", "_", "cb", "cx", "el", "fs", "id", "ul", "li", "sb", "Rx" ] } ],
    "arrow-parens": [ "error", "as-needed", { "requireForBlockBody": true } ],
    "arrow-body-style": [ "error", "as-needed", { "requireReturnForObjectLiteral": false } ],
    "newline-after-var": [ "error", "always" ],
    "no-multi-spaces": "error",
    "space-infix-ops": [ "error", { "int32Hint": false } ],
    "space-before-function-paren": [ "error", "always" ],
    "space-in-parens": [ "error", "always" ],
    "array-bracket-spacing": [ "error", "always", { "singleValue": true, "objectsInArrays": true, "arraysInArrays": true } ],
    "object-curly-spacing": [ "error", "always", { "objectsInObjects": true, "arraysInObjects": true } ],
    "keyword-spacing": [ "error", { "after": true } ],
    "no-unused-vars": [ "error", { "args": "none", "varsIgnorePattern": "React" } ],
    "comma-style": [ "error", "last" ],
    "comma-spacing": [ "error", { "before": false, "after": true } ],
    "comma-dangle": [ "error", {
      "arrays": "never",
      "objects": "never",
      "imports": "never",
      "exports": "never",
      "functions": "never"
    } ],
  
    "react/react-in-jsx-scope": "error",
    "react/jsx-uses-react": "error",
    "react/jsx-uses-vars": "error",
    "react/jsx-tag-spacing": [ "error", { "beforeSelfClosing": "always" } ],
    "react/jsx-max-depth": [ "error", { "max": 9 } ],
    "react/jsx-curly-spacing": [ "error", { "when": "always", "attributes": true, "children": true, "allowMultiline": true, "spacing": { "objectLiterals": "always" } } ]
  }
}
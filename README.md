# React Project Template

### Create Project Steps

> Notes: https://iron-bongo-998.notion.site/React-Project-Template-79bd9b8fa3674b9db950874adae0d72c

```bash
// use vite to create proj
$ pnpm create vite

// use eslint
$ pnpm create @eslint/config

// integrate with your IDE
// (Webstrom config path) Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint

// ues prettier
$ pnpm add prettier -D

// integrate with your IDE
// (Webstrom config path) Preferences | Languages & Frameworks | JavaScript | Prettier

// integrate prettier and eslint
$ pnpm add eslint-config-prettier eslint-plugin-prettier -D
// add lint script

// integrate vite and eslint
$ pnpm add vite-plugin-eslint -D

// use huksy
$ pnpm add husky -D
$ npm pkg set scripts.prepare="husky install"
$ npm run prepare
$ npx husky add .husky/pre-commit "pnpm run lint"

// integrate lint-staged and husky
$ pnpm add lint-staged -D
// modified .husky/pre-commit from "pnpm run lint" to "npx lint-staged"

// use stylelint with less
$ pnpm add stylelint stylelint-config-css-modules stylelint-config-standard postcss-less -D
// add lint:css script
// add "pnpm run lint:css"

// use commitlint
$ pnpm add @commitlint/cli @commitlint/config-conventional -D
// integrate commitlint and husky
$ npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

### Stylelint Config

```jsx
module.exports = {
    extends: [
				'stylelint-config-standard',
				'stylelint-config-css-modules'
		]
}
```

### Commitlint Config

```jsx
module.exports = {
  extends: ["@commitlint/config-conventional"]
}
```

### Husky commit-msg

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx --no-install commitlint -e
```

### Husky pre-commit

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

npx lint-staged
```

### Package Config

```json
// package.json
{
    "script": {
        "lint": "eslint --cache --ext .js,.jsx,.ts,.tsx --fix --quiet ./",
		    "lint:css": "stylelint src/**/*.less --fix --cache --custom-syntax postcss-less"
		},
		"lint-staged": {
		    "*.{js,jsx,tsx,ts}": [
			      "pnpm run lint"
		    ],
		    "*.{css,less}": [
			      "pnpm run lint:css"
		    ]
	  }
}
```

### Vite Config

```jsx
// vite.config.ts
export default defineConfig({
    plugins: [
				react(), // default for React proj
				viteEslint({ failOnError: true }) // integrate eslint
		]
})
```

### ESlint Config

```jsx
// .eslintrc.cjs (common js)
module.exports = {
    env: {
        "browser": true,
        "es2021": true
    },
    extends: [
        "eslint:recommended", // default
        "plugin:react/recommended", // default
        "plugin:@typescript-eslint/recommended", // default
        "plugin:prettier/recommended", // integrate prettier
        "plugin:react/jsx-runtime" // auto import react (^18)
    ],
    parser: "@typescript-eslint/parser",
    parserOptions: {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    plugins: [
        "react",
        "@typescript-eslint",
        "prettier" // integrate prettier
    ],
    settings: {
        react: {
            version: 'detect' // auto import react (^18)
        }
    },
    rules: {
        "prettier/prettier": "error", // integrate prettier
        "arrow-body-style": "off",
        "prefer-arrow-callback": "off",
        "no-unused-vars": "error"
    }
}
```

### Prettier Config
```javascript
// .prettierrc.cjs (common js)
module.exports = {
  printWidth: 80,
  tabWidth: 2,
  useTabs: false,
  singleQuote: true,
  semi: false,
  trailingComma: "none",
  bracketSpacing: true
}
```
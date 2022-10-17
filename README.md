# React Project Template

### Init project steps

1. choose `vite` to create proj

```bash
$ pnpm create vite
```

2. init `eslint`

```bash
$ pnpm create @eslint/config
```

```shell
// package.json
"lint": "eslint --ext .js,.jsx,.ts,.tsx --fix --quiet ./"
```

```jsx
// .exlintrc.cjs
module.exports = {
    "env": {
        "browser": true,
        "es2021": true
    },
    "extends": [
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended"
    ],
    "overrides": [
    ],
		// set react version for eslint
    "settings": {
      "react": {
          "version": "detect"
      }
    },
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
				// Enable JSX support
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
				// New JSX Transform rules
        "react/jsx-uses-react": "off",
        "react/react-in-jsx-scope": "off"
    }
}
```

3. integrate `eslint` with your IDE (WebStrom)

`Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint`

> if find the problem `TypeError: this.libOptions.parse is not a function`, update Webstorm or downgrade eslint@8.22.0
>

> if find the problem `ESLint: 'React' must be in scope when using JSX(react/react-in-jsx-scope)`, disable rules `react/jsx-in-jsx-scope`, [more details](https://reactjs.org/blog/2020/09/22/introducing-the-new-jsx-transform.html)
>

4. install `prettier`

```bash
$ pnpm add prettier -D
```

```javascript
// .prettierrc.cjs
module.exports = {
    printWidth: 80,
    tabWidth: 4,
    useTabs: false,
    singleQuote: true,
    semi: false,
    trailingComma: "none",
    bracketSpacing: true
}
```

5. integrate `prettier` with your IDE (WebStrom)

`Preferences | Languages & Frameworks | JavaScript | Prettier`

6. integrate `prettier` and `eslint`

```bash
$ pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

```javascript
// .eslintrc.cjs
module.exports = {
    //...
    "extends": [
        //...
        "plugin:prettier/recommended"
    ],
    //...
    "plugins": [
        //...
        "prettier"
    ],
    "rules": {
        "prettier/prettier": "error",
        //...
    }
}
```

7. integrate `vite` and `eslint`

```bash
$ pnpm add vite-plugin-eslint -D
```

8. install `huksy`

```bash
$ pnpm add husky -D
$ npm pkg set scripts.prepare="husky install"
$ npm run prepare
$ npx husky add .husky/pre-commit "pnpm run lint"
$ npx husky add .husky/pre-push "pnpm run test"
```

> make sure set husky folder as `executable` file
>

9. integrate `lint-staged` and `husky`

```bash
$ pnpm add lint-staged -D
```

> modified `.husky/pre-commit` from `pnpm run lint` to `npx lint-staged`
>

```json lines
// package.json
{
	//..
	"lint-staged": {
		"*.{js,jsx,ts,tsx}": [
			"npm run lint"
		]
	},
	//..
}
```

10. install `commitlint`

```bash
$ pnpm add @commitlint/cli @commitlint/config-conventional -D
```

```jsx
// .commitlintrc.cjs
module.exports = {
	extends: ["@commitlint/config-conventional"]
}
```

11. integrate `commitlint` and `husky`

```bash
$ npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

12. support `less`, `css-module` and integrate `stylelint` and `husky`

```bash
$ pnpm add less postcss postcss-less stylelint stylelint-config-css-modules stylelint-config-standard -D
```

```json lines
{
    //..
    "script": {
        //..
        "lint:css": "stylelint src/**/*.less --fix --cache --custom-syntax postcss-less"
    },
    "lint-staged": {
      //..
      "*.{css,less}": [
        "pnpm run lint:css"
      ]
    },
    //..
}
```

```jsx
// .stylelintrc.cjs
module.exports = {
    extends: [
        'stylelint-config-standard',
        'stylelint-config-css-modules'
    ]
}
```

### Init test steps

1. install `vitest` and `@tesing-library`

```bash
$ pnpm add vitest @testing-library/dom @testing-library/jest-dom @testing-library/react jsdom -D
```

2. add setup file for `@tesing-library`

```jsx
// setup.ts
import '@testing-library/dom'
import matchers from '@testing-library/jest-dom/matchers'
import { expect } from 'vitest'

expect.extend(matchers)
```

3. add `vitest` config in `vite.config.ts`

```javascript
/// <reference types="vitest" />
/// <reference types="vite/client" />

import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import viteEslint from 'vite-plugin-eslint'

// https://vitejs.dev/config/
export default defineConfig({
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './tests/setup.ts',
    css: true
  },
  //..
})

```

4. add test script

```json lines
// package.json
{
  "script": {
    //..
    "test": "vitest -w=false",
    "test:coverage": "vitest run --coverage",
    //..
  }
}
```

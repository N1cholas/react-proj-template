# React Project Template

### Create Project Steps

1. choose `vite` to create proj

```bash
$ pnpm create vite
```

1. init `eslint`

```bash
$ pnpm create @eslint/config
```

1. integrate `eslint` with your IDE

webstrom config path 👇🏻

`Preferences | Languages & Frameworks | JavaScript | Code Quality Tools | ESLint`

1. install `prettier`

```bash
$ pnpm add prettier -D
```

1. integrate `prettier` with your IDE

```bash
$ pnpm add eslint-config-prettier eslint-plugin-prettier -D
```

1. integrate `vite` and `eslint`

```bash
$ pnpm add vite-plugin-eslint -D
```

1. install `huksy`

```bash
$ pnpm add husky -D
$ npm pkg set scripts.prepare="husky install"
$ npm run prepare
$ npx husky add .husky/pre-commit "pnpm run lint"
```

1. integrate `lint-staged` and `husky`

```bash
$ pnpm add lint-staged -D
// modified .husky/pre-commit from "pnpm run lint" to "npx lint-staged"
```

1. install `stylelint` with `less`

```bash
$ pnpm add stylelint stylelint-config-css-modules stylelint-config-standard postcss postcss-less -D
```

1. install `commitlint`

```bash
$ pnpm add @commitlint/cli @commitlint/config-conventional -D
```

11. integrate `commitlint` and `husky`

```bash
$ npx husky add .husky/commit-msg "npx --no-install commitlint -e $HUSKY_GIT_PARAMS"
```

### Integrate Vitest and Tesing-libraray

1. install `vitest` and `@tesing-library`

```bash
$ pnpm add vitest @testing-library/dom @testing-library/jest-dom @testing-library/react jsdom -D
```

1. add setup for `@tesing-library`

```jsx
import '@testing-library/dom'
```

1. add test utils to override

```jsx
import { cleanup, render } from '@testing-library/react'
import { afterEach } from 'vitest'

afterEach(() => {
    cleanup()
})

const customRender = (ui: React.ReactElement, options = {}) =>
    render(ui, {
        // wrap provider(s) here if needed
        wrapper: ({ children }) => children,
        ...options
    })

export * from '@testing-library/react'
export { default as userEvent } from '@testing-library/user-event'
// override render export
export { customRender as render }
```

1. add `vitest` config in `vite.config.ts`

```jsx
/// <reference types="vitest" />
/// <reference types="vite/client" />

import ... from '..'

export default defineConfig({
	  ...,
    test: {
        globals: true,
        environment: 'jsdom', // for testing-libray
        setupFiles: './src/test/setup.ts', // for testing-libray
        css: true // for css
    }
})
```

1. add test script

```jsx
"script": {
		"test": "vitest",
		"test:coverage": "vitest run --coverage"
}
```

> usually, we use `expect` from `@testing-library/jest-dom/extend-expect`, make sure add its type `@types/testing-library__jest-dom`
>

### Finally Config

- `.stylelintrc.cjs`

    ```jsx
    module.exports = {
        extends: [
    				'stylelint-config-standard',
    				'stylelint-config-css-modules'
    		]
    }
    ```

- `.commitlintrc.cjs`

    ```jsx
    module.exports = {
      extends: ["@commitlint/config-conventional"]
    }
    ```

- `commit-msg`

    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    
    npx --no-install commitlint -e
    ```

- `pre-commit`

    ```bash
    #!/usr/bin/env sh
    . "$(dirname -- "$0")/_/husky.sh"
    
    npx lint-staged
    ```

- `package.json`

    ```json
    {
        "script": {
    				"test": "vitest",
    				"test:coverage": "vitest run --coverage",
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

- `vite.config.ts`

    ```jsx
    /// <reference types="vitest" />
    /// <reference types="vite/client" />
    
    import { defineConfig } from 'vite'
    import react from '@vitejs/plugin-react'
    import viteEslint from 'vite-plugin-eslint'
    
    // https://vitejs.dev/config/
    export default defineConfig({
        plugins: [react(), viteEslint({ failOnError: true })],
        test: {
            globals: true,
            environment: 'jsdom', // for testing-libray
            setupFiles: './src/test/setup.ts', // for testing-libray
            css: true // for css
        }
    })
    ```

- `.eslintrc.cjs`

    ```jsx
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

  - `.prettierrc.cjs`
      ```js
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
## Utils scripts de configuração

### `npm run test -- --watchAll="false" --coverage` run all tests e generate coverage

### `npm i -D prettier eslint-plugin-prettier eslint-config-prettier` install prettier and config eslint

### `npm i prop-types` instala os tipos para javascript, para utilizar nos componentes react

## Aplica as correções do ESLint nos documentos .jsx

### `npx eslint src/**/*.jsx --fix` fix rules ESLint

## Estudo

### Jest

getByRole `utilizar get ao pesquisar um elemento do DOM apresenta erro`
queryByRole
`utilizar query ao pesquisar um elemento do DOM *não* apresenta erro`

## Regra ds Hooks

## `https://pt-br.reactjs.org/docs/hooks-rules.html`

Como parte do meu compromisso com você, estou revisando este curso para
atualizar quaisquer partes que possam ser relevantes na nova versão do React
(React 18).

Ao seguir essa seção, percebi que algumas configurações do Prettier e do ESLint
estão um pouco diferentes do que costumo usar atualmente (30/04/2022).

Instale o Prettier:

npm i -D prettier eslint-plugin-prettier eslint-config-prettier Segue como está
a base do meu .eslintrc.js:

module.exports = { env: { browser: true, es2021: true, jest: true, node: true,
}, extends: [ 'eslint:recommended', 'plugin:react/recommended',
'plugin:react-hooks/recommended', 'plugin:prettier/recommended', ], globals: {
Atomics: 'readonly', SharedArrayBuffer: 'readonly', }, parser:
'@babel/eslint-parser', parserOptions: { ecmaFeatures: { jsx: true, },
ecmaVersion: 'latest', sourceType: 'module', }, plugins: ['react', 'prettier',
'react-hooks'], settings: { react: { version: 'detect', }, }, rules: {
'react/react-in-jsx-scope': 'off', }, }; Podem existir atualizações ou muitas
outras modificações. Porém essa é a base inicial do arquivo.

Segue como está o meu arquivo .prettierrc.js:

module.exports = { arrowParens: 'always', bracketSpacing: true, endOfLine: 'lf',
htmlWhitespaceSensitivity: 'ignore', insertPragma: false, jsxSingleQuote: false,
printWidth: 80, proseWrap: 'always', quoteProps: 'as-needed', requirePragma:
false, semi: true, singleQuote: true, tabWidth: 2, trailingComma: 'all',
useTabs: false, vueIndentScriptAndStyle: false, embeddedLanguageFormatting:
'off', }; Importante: se você usar a extensão do VS Code para o "Prettier",
aponte o caminho do ".prettierrc.js" do projeto nas configurações da extensão.
Pra isso, basta adicionar isso no settings.json do VS Code:

{ "prettier.configPath": "./.prettierrc.js" } Crie um arquivo chamado de
.babelrc.json na raiz do projeto com os seguintes dados:

{ "presets": ["@babel/preset-env", "@babel/preset-react"] } Caso queira ver um
projeto ativo com React 18, React Router Dom v6, ESLint e Prettier, veja:
https://github.com/luizomf/base-react-18-router-dom-v6-eslint-prettier

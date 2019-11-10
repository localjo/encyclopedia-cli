# encyclopedia-cli

> A demo application that allows reading a MediaWiki encyclopedia from the command line

## Install

Unzip or clone the repo, then, from the project's root directory, run:

```
npm install
```

Before running the app, you must set which MediaWiki domain to use as your encyclopedia source. For example;

```bash
export ENCYCLOPEDIA_DOMAIN=wikipedia.org
```

## Usage

Start the interactive CLI with:

```
node index.js --language en
```

The language parameter is optional. You can replace `en` with the language code for any existing encyclopedia language
(e.g. `fr`, `es`, `de`, etc).

## Commands

Once you've started the app, you can type the following commands:

### `READ <article>`

Show article text. Press `q` to stop reading an article.
The `<article>` parameter is a string. If it includes spaces,
you must enclose it in double quotes, e.g. `READ "Santa Claus"`.

### `QUIT`

Exit the application.

### `HELP`

Print the available commands with a short description.

## Tests

This app includes unit tests that can be run with `npm test`.

# wikipedia-cli

> An application that allows reading Wikipedia from the command line

## Install

```
npm install -g git+ssh://git@github.com/localjo/wikipedia-cli.git
```

## Usage

Start the interactive CLI with 

```
wikipedia-cli --language en
```

You can replace `en` with the language code for any existing Wikipedia language
(e.g. `fr`, `es`, `de`, etc).

## Commands

Once you've started the app, you can use the following commands:

### `READ <article>`

Show article text. Press `q` to stop reading an article.
The `<article>` parameter is a string. If it includes spaces,
you must enclose it in double quotes, e.g. `READ "Santa Claus"`.

### `QUIT`

Exit the application.

### `HELP`

Print the available commands with a short description.

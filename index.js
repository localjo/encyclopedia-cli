const cliffy = require('cliffyjo')
const getArticleText = require('./api').getArticleText
const verifyEncyclopedia = require('./api').verifyEncyclopedia
const viewText = require('./viewer').viewText
const argv = require('yargs').alias('l', 'language').argv

const { CLI } = cliffy
verifyEncyclopedia(argv.language).then(lang => {
  const cli = new CLI()
    .setDelimiter(`Encyclopedia (${lang}) > `)
    .addCommand('READ', {
      description: 'Show article text. Press "q" to stop reading an article.',
      parameters: ['article'],
      action: (params) => {
        return getArticleText(params.article, lang).then(text => viewText(text))
      }
    })
    .addCommand('QUIT', {
      description: 'Exit the application.',
      action: () => process.exit()
    })
    .addCommand('HELP', {
      description: 'Print the available commands with a short description.',
      action: () => cli.executeCommand('help')
    })
    .show()
})

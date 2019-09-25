
const axios = require('axios')
const get = require('lodash/get')

function verifyWikiLanguage (lang) {
  return new Promise((resolve, reject) => {
    if (!lang) {
      console.log('No language chosen. Defaulting to English.')
      resolve('en')
      return
    }
    const isAlphanumeric = lang.match(/^[A-Za-z0-9]+$/)
    if (!isAlphanumeric) {
      console.log('Language must be alphanumeric. Defaulting to English.')
      resolve('en')
      return
    }
    console.log(`Verifying that ${lang} Wikipedia exists...`)
    axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
      params: {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'general',
        format: 'json'
      }
    }).then(res => {
      const isWikipedia = get(res, 'data.query.general.generator', '').includes('MediaWiki')
      if (isWikipedia) {
        console.log(`Using Wikipedia in ${lang}`)
        resolve(lang)
      } else {
        console.log(`No ${lang} Wikipedia found. Defaulting to English.`)
        resolve('en')
      }
    }).catch(err => {
      console.log(`${err}. Defaulting to English.`)
      resolve('en')
    })
  })
}

function getArticleText (title, lang) {
  return new Promise((resolve, reject) => {
    const encodedTitle = encodeURIComponent(title.replace(/\s/g, '_')).replace(/'/g, '%27')
    console.log(`Searching for "${encodedTitle}"`)
    axios.get(`https://${lang}.wikipedia.org/w/api.php`, {
      params: {
        action: 'query',
        format: 'json',
        titles: encodedTitle,
        prop: 'extracts',
        exlimit: 1,
        explaintext: true
      }
    }).then((res) => {
      const pageKey = Object.keys(get(res, 'data.query.pages'))[0]
      const articleText = get(res, `data.query.pages[${pageKey}].extract`)
      !articleText ? reject(new Error(`No article named "${title}"`)) : resolve(articleText)
    }).catch(err => reject(new Error(err)))
  })
}

module.exports = { getArticleText, verifyWikiLanguage }

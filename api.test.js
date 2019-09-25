const axios = require('axios')
const MockAdapter = require('axios-mock-adapter')
const api = require('./api')

const mock = new MockAdapter(axios)

beforeEach(() => {
  mock.reset()
})

describe('verifyWikiLanguage', () => {
  it('Uses English if no language supplied', () => {
    expect.assertions(1)
    return api.verifyWikiLanguage().then(l => {
      expect(l).toEqual('en')
    })
  })

  it('Uses English if non-alphanumeric language supplied', () => {
    expect.assertions(1)
    return api.verifyWikiLanguage('invalid.language').then(l => {
      expect(l).toEqual('en')
    })
  })

  it('Uses English if no wikipedia exisits in language ', () => {
    mock.onGet('https://cnr.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'general',
        format: 'json'
      }
    }).reply(200, {})
    expect.assertions(1)
    return api.verifyWikiLanguage('cnr').then(language => {
    // Montenegran, 'cnr', is a valid language code with no wikipedia
      expect(language).toEqual('en')
    })
  })

  it('Correctly verifies language codes', () => {
    mock.onGet('https://es.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        meta: 'siteinfo',
        siprop: 'general',
        format: 'json'
      }
    }).reply(200, { query: { general: { generator: 'MediaWiki' } } })
    expect.assertions(1)
    return api.verifyWikiLanguage('es').then(language => {
      expect(language).toEqual('es')
    })
  })
})

describe('getArticleText', () => {
  it('Returns text from article', () => {
    mock.onGet('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        titles: 'Sample',
        prop: 'extracts',
        exlimit: 1,
        explaintext: true
      }
    }).reply(200, { query: { pages: { 23546: { extract: 'Sample Text' } } } })
    expect.assertions(1)
    return api.getArticleText('Sample', 'en').then(text => {
      expect(text).toEqual('Sample Text')
    })
  })

  it('Encodes spaces and special characters in article name', () => {
    mock.onGet('https://en.wikipedia.org/w/api.php', {
      params: {
        action: 'query',
        format: 'json',
        titles: 'Sample_article%27s_title%2Bspecial',
        prop: 'extracts',
        exlimit: 1,
        explaintext: true
      }
    }).reply(200, { query: { pages: { 23546: { extract: 'Sample Text' } } } })
    expect.assertions(1)
    return api.getArticleText("Sample article's title+special", 'en').then(text => {
      expect(text).toEqual('Sample Text')
    })
  })
})

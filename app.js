const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const SpikeDatoCMS = require('spike-datocms')

const locals = {}
const env = require('dotenv').config()

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr'},
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => { return { pageId: pageId(ctx), contentRoot: "https://www.datocms-assets.com/"} },
    minify: env === 'production'
  }),
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: process.env.DATO_TOKEN,
      models: [
        {
          name: 'home',
          template: {
            path: 'views/home.sgr',
            output: home => {
              return `index.html`
            }
          }
        }
      ]
    })
  ],
  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}

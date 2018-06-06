const htmlStandards = require('reshape-standard')
const cssStandards = require('spike-css-standards')
const jsStandards = require('spike-js-standards')
const pageId = require('spike-page-id')
const sugarml = require('sugarml')
const sugarss = require('sugarss')
const SpikeDatoCMS = require('spike-datocms')
const include = require('reshape-include')

const locals = {}
const env = require('dotenv').config()

module.exports = {
  devtool: 'source-map',
  matchers: { html: '*(**/)*.sgr'},
  ignore: ['**/layout.sgr', 'templates/**', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    minify: env === 'production',
    locals
  }),
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: process.env.DATO_TOKEN,
      models: [
        {
          type: 'navbar',
        },
        {
          name: 'home',
          template: {
            path: 'views/home.sgr',
            output: home => {
              return `index.html`
            }
          }
        },
        {
          type: 'footer',
        }
      ]
    }),
    include()
  ],
  postcss: cssStandards({
    minify: env === 'production',
    warnForDuplicates: env !== 'production'
  }),
  babel: jsStandards()
}

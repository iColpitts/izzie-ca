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
  matchers: { html: '*(**/)*.sgr', css: '*(**/)*.sss' },
  ignore: ['**/layout.sgr', '**/_*', '**/.*', 'readme.md', 'yarn.lock', 'package-lock.json'],
  reshape: htmlStandards({
    parser: sugarml,
    locals: (ctx) => { return { pageId: pageId(ctx), foo: 'bar' } },
    minify: env === 'production'
  }),
  plugins: [
    new SpikeDatoCMS({
      addDataTo: locals,
      token: env.DATO_TOKEN,
      models: [
        {
          name: 'work',
          template: {
            path: 'templates/work.html',
            output: work => {
              return `works/${work.slug}.html`
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

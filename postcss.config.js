/* global process __dirname */
const DEV = process.env.NODE_ENV !== 'production';

const path = require('path');
const autoPrefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker');
const postcssFontMagician = require('postcss-font-magician');
const cssNano = require('cssnano');

const pluginName = 'quizess';
const fontsPath = path.join(__dirname, 'skin/public/fonts');
const publicFontsPath = `/wp-content/plugins/${pluginName}/skin/public/fonts`;

const plugins = [
  autoPrefixer,
  postcssFontMagician({
    custom: {
      Graphik: {
        variants: {
          normal: {
            400: {
              url: {
                woff: `${publicFontsPath}/graphik-regular-web.woff`,
                woff2: `${publicFontsPath}/graphik-regular-web.woff2`,
              },
            },
            600: {
              url: {
                woff: `${publicFontsPath}/graphik-semibold-web.woff`,
                woff2: `${publicFontsPath}/graphik-semibold-web.woff2`,
              },
            },
            700: {
              url: {
                woff: `${publicFontsPath}/graphik-bold-web.woff`,
                woff2: `${publicFontsPath}/graphik-bold-web.woff2`,
              },
            },
          },
        },
      },
    },
    foundries: ['custom'],
  }),
  cssMqpacker,
];

// Use only for production build
if (!DEV) {
  plugins.push(cssNano);
}

module.exports = {plugins};

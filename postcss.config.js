const DEV = process.env.NODE_ENV !== 'production';

const autoPrefixer = require('autoprefixer');
const cssMqpacker = require('css-mqpacker');
const postcssFontMagician = require('postcss-font-magician');
const cssNano = require('cssnano');

const pluginName = 'quizess';
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
      quizess: {
        variants: {
          normal: {
            400: {
              url: {
                ttf: `${publicFontsPath}/quizess.ttf`,
                eot: `${publicFontsPath}/quizess.svg`,
                woff: `${publicFontsPath}/quizess.woff`,
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

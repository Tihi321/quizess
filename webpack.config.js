/* global process __dirname */
const DEV = process.env.NODE_ENV !== 'production';

const wplib = [
  'components',
  'compose',
  'dispatch',
  'blocks',
  'element',
  'editor',
  'date',
  'data',
  'i18n',
  'keycodes',
  'plugins',
  'editPost',
  'blockSerializationDefaultParser',
  'apiFetch',
  'notices',
  'domReady',
  'url',
];

const externals = (function() {
  const ret = {};
  wplib.forEach((name) => {
    ret[`@wp/${name}`] = `wp.${name}`;
    ret[`@wordpress/${name}`] = `wp.${name}`;
  });
  ret.ga = 'ga';
  ret.gtag = 'gtag';
  ret.jquery = 'jQuery';
  ret.react = 'React';
  ret['react-dom'] = 'ReactDOM';
  ret.backbone = 'Backbone';
  ret.lodash = 'lodash';
  ret.moment = 'moment';
  ret.tinyMCE = 'tinyMCE';
  ret.tinymce = 'tinymce';

  return ret;
})();

const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const BrowserSyncPlugin = require('browser-sync-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const ManifestPlugin = require('webpack-manifest-plugin');

const appPath = `${path.resolve(__dirname)}`;

// Dev Server
const proxyUrl = 'dev.gutenberg-blocks.test/'; // local dev url example: dev.wordpress.com

// Plugin
const pluginName = 'quizess';
const pluginPath = '/skin';
const pluginFullPath = `${appPath}${pluginPath}`;
const pluginPublicPath = `/wp-content/plugins/${pluginName}${pluginPath}/public/`;
const pluginApplicationJs = `${pluginFullPath}/assets/application.js`;
const pluginAdminJs = `${pluginFullPath}/assets/application-admin.js`;
const pluginEditorJs = `${pluginFullPath}/assets/application-editor.js`;
const pluginOutput = `${pluginFullPath}/public`;


// Outputs
const outputJs = 'scripts/[name]-[hash].js';
const outputCss = 'styles/[name]-[hash].css';
const outputFile = '[name].[ext]';
const outputImages = `images/${outputFile}`;
const outputFonts = `fonts/${outputFile}`;

const allModules = {
  rules: [
    {
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    },
    {
      test: /\.json$/,
      exclude: /node_modules/,
      use: 'file-loader',
    },
    {
      test: /\.(png|svg|jpg|jpeg|gif|ico)$/,
      exclude: [/fonts/, /node_modules/],
      use: `file-loader?name=${outputImages}`,
    },
    {
      test: /\.(eot|otf|ttf|woff|woff2|svg)$/,
      exclude: [/images/, /node_modules/],
      use: `file-loader?name=${outputFonts}`,
    },
    {
      test: /\.scss$/,
      exclude: /node_modules/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader', 'postcss-loader', 'sass-loader',
      ],
    },
  ],
};

const allPlugins = [
  new MiniCssExtractPlugin({
    filename: outputCss,
  }),

  // Use BrowserSync For assets
  new BrowserSyncPlugin({
    host: 'localhost',
    port: 3000,
    proxy: proxyUrl,
    files: [
      {
        match: ['**/*.php'],
      },
    ],
  }),

  new ManifestPlugin(),
];

const allOptimizations = {};

// Use only for production build
if (!DEV) {
  allOptimizations.minimizer = [
    new UglifyJsPlugin({
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false,
        },
        compress: {
          warnings: false,
          drop_console: true, // eslint-disable-line camelcase
        },
      },
    }),
  ];
  allPlugins.push(new CleanWebpackPlugin([pluginOutput]));
}

const developmentPlugins = [];

// Use only for development build
if (DEV) {

  developmentPlugins.copyDevelopmentReact = [

    // Find react in node_modules and copy it to public folder
    {
      from: `${appPath}/node_modules/react/umd/react.development.js`,
      to: `${pluginOutput}/scripts/vendors`,
    },

    // Find reactDom in node_modules and copy it to public folder
    {
      from: `${appPath}/node_modules/react-dom/umd/react-dom.development.js`,
      to: `${pluginOutput}/scripts/vendors`,
    },

  ];

  allPlugins.push(new CopyWebpackPlugin(developmentPlugins.copyDevelopmentReact));
}

module.exports = [

  // Admin Part.
  {
    context: path.join(__dirname),
    entry: {
      adminQuizess: [pluginAdminJs],
      blocksQuizess: [pluginEditorJs],
      applicationQuizess: [pluginApplicationJs],
    },
    output: {
      path: pluginOutput,
      publicPath: pluginPublicPath,
      filename: outputJs,
    },

    // Add externals.
    externals,

    optimization: allOptimizations,

    mode: 'development',

    module: allModules,

    plugins: allPlugins,

    devtool: DEV ? '' : '#inline-source-map',
  },
];

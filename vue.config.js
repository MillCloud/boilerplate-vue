/* eslint-disable no-param-reassign */
const path = require('path');
const CompressionPlugin = require('compression-webpack-plugin');
const StylelintPlugin = require('stylelint-webpack-plugin');

const arrGZipExtension = [
  'html',
  'js',
  'css',
  'ttf',
  'eot',
  'otf',
  'woff',
  'woff2',
  'png',
];

module.exports = {
  configureWebpack: (config) => {
    config.plugins.push(
      new StylelintPlugin({
        files: ['src/**/*.{css,less,sass,scss,vue}'],
        fix: true,
      }),
    );
    config.resolve.alias = {
      '@': path.resolve('src'),
      '@a': path.resolve('src', 'assets'),
      '@c': path.resolve('src', 'components'),
      '@u': path.resolve('src', 'utils'),
    };
    if (process.env.NODE_ENV !== 'development') {
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true;
      config.plugins.push(
        new CompressionPlugin({
          test: new RegExp(`\\.(${arrGZipExtension.join('|')})$`),
        }),
      );
      config.optimization.splitChunks = {
        chunks: 'all',
        cacheGroups: {
          vendors: {
            chunks: 'initial',
            name: 'chunk-vendors',
            priority: 10,
            test: /[/\\]node_modules[/\\]/,
          },
          'element-plus': {
            name: 'chunk-element-plus',
            priority: 20,
            test: /[/\\]node_modules[/\\]_?element-plus(.*)/,
          },
          components: {
            minChunks: 2,
            name: 'chunk-components',
            priority: 5,
            reuseExistingChunk: true,
            test: path.resolve('src', 'components'),
          },
        },
      };
    }
  },
  css: {
    loaderOptions: {
      scss: {
        additionalData: '@import "~@/styles/variables.scss";',
      },
    },
  },
  devServer: {
    proxy: process.env.VUE_APP_BASE_URL || 'https://fake.url',
  },
  pluginOptions: {
    electronBuilder: {
      preload: path.resolve('src', 'preload.ts'),
      builderOptions: {
        // eslint-disable-next-line no-template-curly-in-string
        artifactName: '${productName}_${version}_${os}_${arch}.${ext}',
        appId: '',
        productName: '',
        copyright: '',
        icon: path.resolve('src', 'assets', 'app.png'),
        mac: {
          target: [{ target: 'dmg', arch: ['universal'] }],
        },
        win: {
          target: [{ target: 'nsis', arch: ['x64', 'ia32'] }],
        },
        nsis: {
          oneClick: false,
          perMachine: true,
          allowElevation: true,
          allowToChangeInstallationDirectory: true,
        },
        linux: {
          target: [{ target: 'AppImage', arch: ['x64'] }],
        },
      },
    },
    i18n: {
      locale: process.env.VUE_APP_I18N_LOCALE || 'zh-Hans',
      fallbackLocale: process.env.VUE_APP_I18N_FALLBACK_LOCALE || 'zh-Hans',
      localeDir: 'i18n/locales',
      enableInSFC: false,
      enableLegacy: false,
    },
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH || '/',
};

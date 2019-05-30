/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const env = EmberApp.env();
const isProductionLike = ['production', 'staging'].includes(env);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Makes SASS listent to file changes in the component folders
    sassOptions: {
      includePaths: ['app/components'],
      overwrite: true
    },
    // Adds CSS browser prefixes
    autoprefixer: {
      browsers: [
        '> 1%',
        'Explorer > 10',
        'Firefox >= 17',
        'Chrome >= 10',
        'Safari >= 6',
        'iOS >= 6'
      ],
      cascade: false,
      remove: false
    },
    // Prevent CSS minification in development and tests
    minifyCSS: {
      enabled: isProductionLike
    },
    // Prevent JS minification in development and tests
    minifyJS: {
      enabled: isProductionLike
    },
    // Enable source maps for debugging and Sentry
    sourcemaps: {
      enabled: true,
      extensions: ['js']
    },
    // Only fingerprint assets for production builds that aren't the native app
    fingerprint: {
      enabled: true,
      extensions: ['js', 'css']
    },
    // Include polyfills for old browsers
    'ember-cli-babel': {
      includePolyfill: true
    }
  });

  app.import('node_modules/animejs/anime.min.js');

  return app.toTree();
};

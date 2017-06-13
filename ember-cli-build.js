/* eslint-env node */
const EmberApp = require('ember-cli/lib/broccoli/ember-app');
const env = EmberApp.env();
const isProductionLikeBuild = ['production', 'staging'].includes(env);

module.exports = function(defaults) {
  var app = new EmberApp(defaults, {
    // Makes SASS listent to file changes in the component folders
    sassOptions: {
      includePaths: ['app/pods/components']
    },
    // Adds CSS browser prefixes
    autoprefixer: {
      browsers: ['> 1%', 'Explorer > 9', 'Firefox >= 17', 'Chrome >= 10', 'Safari >= 6', 'iOS >= 6'],
      cascade: false,
      remove: false
    },
    minifyCSS: {
      enabled: isProductionLikeBuild
    },
    minifyJS: {
      enabled: isProductionLikeBuild
    },
    sourcemaps: {
      enabled: isProductionLikeBuild
    }
  });

  app.import('vendor/google-analytics.js');

  return app.toTree();
};

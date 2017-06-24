/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'moonmother',
    environment: environment,
    rootURL: '/',
    locationType: 'auto',
    podModulePrefix: 'moonmother/pods',
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {}
  };

  if (environment === 'development') {

  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
  }

  if (environment === 'production') {
    ENV.googleAnalytics = { trackingId: 'UA-34474019-12' };
  }

  return ENV;
};

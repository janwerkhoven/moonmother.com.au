/* eslint-env node */

module.exports = function(environment) {
  var ENV = {
    modulePrefix: 'moonmother',
    environment,
    rootURL: '/',
    locationType: 'history',
    googleAnalytics: {
      trackingId: 'UA-34474019-12'
    },
    EmberENV: {
      FEATURES: {},
      EXTEND_PROTOTYPES: {
        Date: false
      }
    },
    APP: {}
  };

  if (environment === 'production') {
  }

  if (environment === 'staging') {
  }

  if (environment === 'development') {
  }

  if (environment === 'test') {
    ENV.locationType = 'none';
    ENV.APP.LOG_ACTIVE_GENERATION = false;
    ENV.APP.LOG_VIEW_LOOKUPS = false;
    ENV.APP.rootElement = '#ember-testing';
    ENV.APP.autoboot = false;
  }

  return ENV;
};

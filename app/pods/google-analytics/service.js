import Ember from 'ember';
import config from '../../config/environment';

const { computed } = Ember;

export default Ember.Service.extend({

  enabled: computed(function() {
    return config.googleAnalytics && config.googleAnalytics.trackingId && ga;
  }),

  startListening() {
    if (!this.get('enabled')) { return; };
    ga('create', {
      trackingId: config.googleAnalytics.trackingId
    });
    ga('set', {
      dimension1: config.environment
    });
  },

  hit(currentRoute) {
    if (!this.get('enabled')) { return; };
    ga('set', {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension2: currentRoute.routeName.replace(/\./g, '/'),
    });
    ga('send', 'pageview');
  }

});

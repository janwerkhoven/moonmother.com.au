import Service from '@ember/service';
import config from '../config/environment';

const ready =
  config.googleAnalytics && config.googleAnalytics.trackingId && ga
    ? true
    : false;

export default Service.extend({
  // Set up the GA tracking object
  startTracking() {
    if (!ready) {
      return;
    }
    ga('create', {
      trackingId: config.googleAnalytics.trackingId
    });
    ga('set', {
      dimension1: config.modulePrefix,
      dimension2: config.environment
    });
  },

  // Send a page view to GA
  // Documentation: https://developers.google.com/analytics/devguides/collection/analyticsjs/pages
  sendPageView(currentRoute) {
    if (!ready) {
      return;
    }
    ga('set', {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension3: currentRoute.routeName.replace(/\./g, '/')
    });
    ga('send', 'pageview');
  },

  // Send event to Google Analytics
  // Documentation: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  sendEvent(category, action, label, value) {
    if (!ga || !category || !action) {
      return;
    }
    const obj = {
      hitType: 'event',
      eventCategory: category,
      eventAction: action
    };
    if (label) {
      obj.eventLabel = label;
    }
    if (value) {
      obj.eventValue = value;
    }
    ga('send', obj);
  }
});

import Service from '@ember/service';
import config from '../config/environment';
import { readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';

export default Service.extend({
  fastboot: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  canUseGA: computed('isFastBoot', function() {
    if (this.isFastBoot) {
      return false;
    }
    try {
      return config.googleAnalytics && config.googleAnalytics.trackingId && ga;
    } catch (e) {
      return false;
    }
  }),

  // Set up the GA tracking object
  startTracking() {
    if (this.isFastBoot) {
      return false;
    }

    // prettier-ignore
    (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
    (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
    })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');

    if (!this.canUseGA) {
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
    if (!this.canUseGA) {
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
    if (!this.canUseGA) {
      return;
    }
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

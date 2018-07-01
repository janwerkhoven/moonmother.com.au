import Ember from "ember";
import config from "../config/environment";

const ready =
  config.googleAnalytics && config.googleAnalytics.trackingId && ga
    ? true
    : false;

export default Ember.Service.extend({
  startTracking() {
    if (!ready) {
      return;
    }
    ga("create", {
      trackingId: config.googleAnalytics.trackingId
    });
    ga("set", {
      dimension1: config.modulePrefix,
      dimension2: config.environment
    });
  },

  sendPageView(currentRoute) {
    if (!ready) {
      return;
    }
    ga("set", {
      page: window.location.pathname,
      hostname: window.location.host,
      title: document.title,
      dimension3: currentRoute.routeName.replace(/\./g, "/")
    });
    ga("send", "pageview");
  },

  // Send event to Google Analytics
  // Documentation: https://developers.google.com/analytics/devguides/collection/analyticsjs/events
  sendEvent(category, action, label, value) {
    if (!ga || !category || !action) {
      return;
    }
    const obj = {
      hitType: "event",
      eventCategory: category,
      eventAction: action
    };
    if (label) {
      obj.eventLabel = label;
    }
    if (value) {
      obj.eventValue = value;
    }
    ga("send", obj);
  }
});

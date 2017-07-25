import Ember from 'ember';
import config from '../config/environment';

// TODO: Consider using https://github.com/ronco/ember-cli-head

// Set the defaults to whatever is in index.html
const defaultTitle = document.title;
const defaultDescription = document.head.querySelector('meta[name=description]').content;

export default Ember.Service.extend({

  setMetaTags(route) {
    const title = route.get('seoTitle') || defaultTitle;
    const description = route.get('seoDescription') || defaultDescription;
    let robotIndex = route.get('robotIndex') || true;
    let robotFollow = route.get('robotFollow') || true;

    // Only set robot to index and follow in production environment
    if (config.environment !== 'production') {
      robotIndex = false;
      robotFollow = false;
    }

    this.setTitle(title);
    this.setDescription(description);
    this.setRobot(robotIndex, robotFollow);
  },

  setTitle(string) {
    return document.title = string;
  },

  setDescription(string) {
    return document.head.querySelector('meta[name=description]').content = string;
  },

  setCanonical(url) {
    return document.head.querySelector('link[rel=canonical]').href = url;
  },

  setRobot(robotIndex, robotFollow) {
    const index = robotIndex === false ? 'noindex' : 'index';
    const follow = robotFollow === false ? 'nofollow' : 'follow';
    return document.head.querySelector('meta[name=robots]').content = `${index}, ${follow}`;
  }

});

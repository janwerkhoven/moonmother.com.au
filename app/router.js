import Ember from 'ember';
import config from './config/environment';

const { inject } = Ember;

const Router = Ember.Router.extend({
  location: config.locationType,
  rootURL: config.rootURL,
  seo: inject.service(),
  googleAnalytics: inject.service(),
  onInit: Ember.on('init', function() {
    this.get('googleAnalytics').startTracking();
  }),
  onEachDidTransition: Ember.on('didTransition', function() {
    const currentRoute = Ember.getOwner(this).lookup('route:' + this.currentRouteName);
    this.get('seo').setMetaTags(currentRoute);
    this.get('googleAnalytics').sendPageView(currentRoute);
  })
});

Router.map(function() {
  this.route('services');
  this.route('about');
  this.route('catchall', { path: '*:' });
});

export default Router;

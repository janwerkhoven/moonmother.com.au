import EmberRouter from '@ember/routing/router';
import config from './config/environment';
import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { on } from '@ember/object/evented';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  galaxy: service(),
  googleAnalytics: service(),
  headData: service(),

  onInit: on('init', function() {
    this.googleAnalytics.startTracking();
  }),

  onEachDidTransition: on('didTransition', function() {
    const currentRoute = getOwner(this).lookup(
      'route:' + this.currentRouteName
    );
    this.googleAnalytics.sendPageView(currentRoute);
    this.galaxy.rotateCelestials();
  }),

  // For setting the meta title
  setTitle(title) {
    this.get('headData').set('title', title);
  }
});

Router.map(function() {
  // The main 3 pages found in galaxy header
  // this.route('index');
  this.route('services');
  this.route('about');

  // The 7 SEO friendly landing pages
  this.route('av-hire');
  this.route('event-hire');
  this.route('festival-stage-hire');
  this.route('lighting-hire');
  this.route('mobile-trailer-stage');
  this.route('sound-system');
  this.route('truss-hire');

  // Catch and redirect all other paths
  this.route('catchall', { path: '*:' });
});

export default Router;

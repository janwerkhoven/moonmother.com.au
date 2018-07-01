import { inject as service } from '@ember/service';
import { getOwner } from '@ember/application';
import { on } from '@ember/object/evented';
import EmberRouter from '@ember/routing/router';
import config from './config/environment';

const Router = EmberRouter.extend({
  location: config.locationType,
  rootURL: config.rootURL,

  seo: service(),
  googleAnalytics: service(),

  onInit: on('init', function() {
    this.get('googleAnalytics').startTracking();
  }),
  onEachDidTransition: on('didTransition', function() {
    const currentRoute = getOwner(this).lookup(
      'route:' + this.currentRouteName
    );
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

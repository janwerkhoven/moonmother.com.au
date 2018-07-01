import Component from '@ember/component';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',

  googleAnalytics: service(),

  actions: {
    showEmail() {
      // TODO: trigger once per page
      get('googleAnalytics').sendEvent(
        'conversions',
        'user clicked "Email us"',
        get(this, 'currentRoute')
      );
      // Send conversion event
      // Show email
    },
    showPhone() {
      get('googleAnalytics').sendEvent(
        'conversions',
        'user clicked "Email us"',
        get(this, 'currentRoute')
      );
      // Send conversion event
      // Show phone
    }
  },

  didInsertElement() {
    // On how to get accessToken for Instafeed
    // https://www.instagram.com/developer/
    // https://www.instagram.com/moonmotherproductions/
    // https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed
    // https://www.instagram.com/oauth/authorize/?client_id=12338153407546998e72a429b4dd5684&redirect_uri=http://localhost:4200&response_type=token&scope=public_content
    // http://localhost:4200/#access_token=2932372041.7c3728d.a7f05e286ab942c6b71b4c58d3f597e4
    let feed = new Instafeed({
      // userId: '1437536913', // Hannah
      // accessToken: '1437536913.1677ed0.02677d6ce703465e80498fcd44f92c54', // Hannah
      get: 'user',
      userId: '2932372041',
      accessToken: '2932372041.7c3728d.a7f05e286ab942c6b71b4c58d3f597e4',
      sortBy: 'random',
      links: true,
      limit: 10,
      resolution: 'standard_resolution',
      template:
        '<div><a href={{link}} target="_blank"><img src={{image}} alt="{{caption}}"/></a></div>'
    });
    feed.run();
  }
});

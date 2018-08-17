import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';

export default Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',

  fastboot: service(),
  googleAnalytics: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  // Email and phone are hidden until clicked so we can measure conversions
  showEmail: false,
  showPhone: false,

  sendConversion(button) {
    this.googleAnalytics.sendEvent(
      'conversions',
      `user clicked "${button}"`,
      location.href
    );
  },

  actions: {
    showEmail() {
      this.toggleProperty('showEmail');
      this.sendConversion('Email us');
    },
    showPhone() {
      this.toggleProperty('showPhone');
      this.sendConversion('Call us');
    }
  },

  // Not called in Fastboot
  didInsertElement() {
    // Prevent Instafeed from instantiating if Fastboot (for performance)
    if (this.isFastBoot) {
      return;
    }
    // On how to get accessToken for Instafeed
    // https://www.instagram.com/developer/
    // https://www.instagram.com/moonmotherproductions/
    // https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed
    // https://www.instagram.com/oauth/authorize/?client_id=12338153407546998e72a429b4dd5684&redirect_uri=http://localhost:4200&response_type=token&scope=public_content
    // http://localhost:4200/#access_token=2932372041.7c3728d.a7f05e286ab942c6b71b4c58d3f597e4
    let feed = new Instafeed({
      get: 'user',
      userId: '2932372041',
      accessToken: '2932372041.7c3728d.a7f05e286ab942c6b71b4c58d3f597e4',
      sortBy: 'random',
      links: true,
      limit: 10,
      resolution: 'standard_resolution',
      template: `<div><a href={{link}} target="_blank" rel="noopener" title="See '{{caption}}' on Instagram"><img src={{image}} alt="{{caption}}"/></a></div>`
    });
    feed.run();
  }
});

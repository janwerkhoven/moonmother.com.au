import Component from '@ember/component';
import config from 'ember-get-config';
import { not, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, waitForEvent } from 'ember-concurrency';

const testing = config.buildConfig.isTest;

export default Component.extend({
  tagName: 'footer',
  elementId: 'page-footer',

  fastboot: service(),
  googleAnalytics: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),

  // Whether the footer is out of view of the user.
  // Used to delay loading InstaFeed.
  inView: false,
  outOfView: not('inView'),

  // Email and phone are hidden until clicked so we can measure conversions.
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

  didInsertElement() {
    this._super(...arguments);
    this.listenForScrolls.perform();
  },

  listenForScrolls: task(function*() {
    // Don't listen for scrolls in tests
    // Guard for window global if fastboot
    if (this.isFastBoot || testing) {
      return;
    }

    const checkIfInView = () => {
      const footer = document.getElementById('page-footer');
      const offsetTop = footer.offsetTop; // Distance between top of element and top of page.
      const scrollTop = window.scrollY || window.pageYOffset; // Distance between top of viewport and top of page.
      const windowHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.getElementsByTagName('body')[0].clientHeight;

      const inView = scrollTop + windowHeight > offsetTop;

      // Set inView to true triggers the Youtube iframe to show in the template,
      // thus loading all it's expensive content. This task will stop listening
      // for scrolls as well.
      if (inView) {
        this.set('inView', true);
        this.loadInstaFeed();
      }
    };

    // Run this task until the video is within view.
    while (this.outOfView) {
      // Wait for a scroll event.
      yield waitForEvent(window, 'scroll');
      // Check if the video section is in view.
      checkIfInView();
    }
  }).restartable(),

  loadInstaFeed() {
    // On how to get accessToken for Instafeed
    // https://www.instagram.com/developer/
    // https://www.instagram.com/moonmotherproductions/
    // https://github.com/adrianengine/jquery-spectragram/wiki/How-to-get-Instagram-API-access-token-and-fix-your-broken-feed
    // https://www.instagram.com/oauth/authorize/?client_id=12338153407546998e72a429b4dd5684&redirect_uri=http://localhost:4200&response_type=token&scope=public_content
    // http://localhost:4200/#access_token=2932372041.7c3728d.a7f05e286ab942c6b71b4c58d3f597e4
    //
    // TODO: Use environment variable to hide accessToken from code
    // TODO: Exclude InstaFeed from the Fastboot build
    //
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

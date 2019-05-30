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

  // On page load, we don't load Instagram until user has the footer in view.
  // If the load happens to slow, the user sees an empty footer, then the new images jerk into place.
  // To prevent that we show placeholder images until the latest images have been loaded in.
  showTemporaryInstafeed: true,

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
        this.fetchInstagramImages();
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

  // Instagram feed
  fetchInstagramImages() {
    fetch(
      'https://api.instagram.com/v1/users/self/media/recent/?access_token=2932372041.7c3728d.8d1d6d4278fb4d9eac8cdaef23c2dcea'
    )
      .then(response => {
        return response.json();
      })
      .then(json => {
        // We randomly select 10 images
        const images = this.shuffle(json.data).slice(0, 10);
        this.renderInstagramImages(images);
      });
  },

  renderInstagramImages(data) {
    let html = '';
    data.forEach(function(item) {
      const img = item.images['standard_resolution'];
      const alt = item.caption.text
        .replace(/"/g, '')
        .replace(/\r?\n|\r/g, '')
        .replace(/ {2}/g, '');
      html += `
        <div>
          <a
            href="${item.link}"
            target="_blank"
            rel="noopener"
            title="${alt}"
          >
            <img
              src="${img.url}"
              width="${img.width}"
              height="${img.height}"
              alt="${alt}"
            />
          </a>
        </div>
        `;
    });
    this.element.querySelector('#instafeed').innerHTML = html;
  },

  /**
   * Shuffles array in place. ES6 version
   * @param {Array} a items An array containing the items.
   */
  shuffle(a) {
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  }
});

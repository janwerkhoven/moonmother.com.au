import Component from '@ember/component';
import config from 'ember-get-config';
import { set } from '@ember/object';
import { and, not, readOnly } from '@ember/object/computed';
import { inject as service } from '@ember/service';
import { task, waitForEvent } from 'ember-concurrency';

const testing = config.buildConfig.isTest;

export default Component.extend({
  tagName: 'section',
  elementId: 'background-video',

  fastboot: service(),

  isFastBoot: readOnly('fastboot.isFastBoot'),
  isNotFastboot: not('isFastBoot.isFastBoot'),

  // Whether the video is in view of the user.
  inView: false,
  outOfView: not('inView'),

  // Whether to show and load the Youtube video.
  // Because it's expensive
  showVideo: and('isNotFastboot', 'inView'),

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
      const videoSection = document.getElementById('background-video');
      const offsetTop = videoSection.offsetTop; // Distance between top of element and top of page.
      const scrollTop = window.scrollY || window.pageYOffset; // Distance between top of viewport and top of page.

      const inView = scrollTop > offsetTop;

      // Set inView to true triggers the Youtube iframe to show in the template,
      // thus loading all it's expensive content. This task will stop listening
      // for scrolls as well.
      if (inView) {
        set(this, 'inView', true);
      }
    };

    // Run this task until the video is within view.
    while (this.outOfView) {
      // Wait for a scroll event.
      yield waitForEvent(window, 'scroll');
      // Check if the video section is in view.
      checkIfInView();
    }
  }).restartable()
});

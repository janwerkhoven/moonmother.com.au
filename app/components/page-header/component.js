import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { scrollTo } from 'moonmother/helpers/scroll-to';

let rotations = [-90, 0, 90];
let degrees = [-90, 0, 90];
const totalDuration = 2600;
const easing = 'easeInOutCubic';

export default Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'collapsed:collapsed'],

  router: service('-routing'),

  currentRoute: readOnly('router.currentRouteName'),

  collapsed: false,

  rotateCelestialsTo(target, instant) {
    const collapsed = this.collapsed;

    // TODO: Find better way to do this
    if (collapsed) {
      if (target === 'about') {
        rotations = [-60, 0, 60];
      } else if (target === 'services') {
        rotations = [60, -60, 0];
      } else {
        rotations = [0, 60, -60];
      }
    } else {
      if (target === 'about') {
        rotations = [-90, 0, 90];
      } else if (target === 'services') {
        rotations = [90, -90, 0];
      } else {
        rotations = [0, 90, -90];
      }
    }

    const duration = instant ? 0 : totalDuration;

    const rotationIndex = `${rotations[0]}deg`;
    const rotationAbout = `${rotations[1]}deg`;
    const rotationServices = `${rotations[2]}deg`;

    anime({
      targets: '.planet#index',
      rotateZ: rotationIndex,
      delay: 0,
      duration,
      easing
    });

    anime({
      targets: '.planet#about',
      rotateZ: rotationAbout,
      delay: 100, // Spread the animations for smoother frame rate
      duration,
      easing
    });

    anime({
      targets: '.planet#services',
      rotateZ: rotationServices,
      delay: 200, // Spread the animations for smoother frame rate
      duration,
      easing
    });

    // $(`.planet`).each(function(i) {
    //   if ($(this).hasClass('velocity-animating')) {
    //     return;
    //   }
    //   const currentPos = degrees[i];
    //   let targetPos = positions[i];
    //   let newPos = targetPos <= currentPos ? targetPos + 360 : targetPos;
    //   $(this)
    //     .velocity('stop')
    //     .delay(i * 100)
    //     .velocity(
    //       {
    //         rotateZ: `${newPos}deg`
    //       },
    //       {
    //         duration,
    //         easing,
    //         complete: function() {
    //           $(this).velocity({ rotateZ: `${targetPos}deg` }, 0);
    //           degrees[i] = targetPos;
    //         }
    //       }
    //     );
    // });
  },

  scrollToTop() {
    scrollTo('#page-header', totalDuration, easing);
  },

  // Ignored in Fastboot
  didInsertElement() {
    this.rotateCelestialsTo(this.currentRoute, true);
  },

  actions: {
    collapseGalaxy(event) {
      const id = event.currentTarget.id;
      if (id === this.currentRoute) {
        return;
      }
      this.set('collapsed', true);
      this.rotateCelestialsTo(id);
      this.scrollToTop();
    },
    expandGalaxy() {
      this.set('collapsed', false);
      this.rotateCelestialsTo('index');
    }
  }
});

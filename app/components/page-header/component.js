import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { scrollTo } from 'moonmother/helpers/scroll-to';

const totalDuration = 2200;
const easing = 'easeInOutCubic';
const routes = ['index', 'about', 'services'];
const positions = {
  full: {
    index: [0, 90, -90],
    about: [-90, 0, 90],
    services: [90, -90, 0]
  },
  half: {
    index: [0, 60, -60],
    about: [-60, 0, 60],
    services: [60, -60, 0]
  }
};

export default Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'collapsed:collapsed'],

  router: service('router'),

  currentRoute: readOnly('router.currentRouteName'),

  collapsed: false,
  isAnimating: false,

  rotateCelestialsTo(targetRoute = 'index', instant = false) {
    // Running the animation whilst still animating, the planets will move anti-clockwise.
    if (this.isAnimating) {
      return;
    }
    this.set('isAnimating', true);

    const duration = instant ? 0 : totalDuration;
    const stance = this.collapsed ? 'half' : 'full';
    const currentSet = positions[stance][this.currentRoute];
    const targetSet = positions[stance][targetRoute];

    const self = this;

    routes.forEach((route, i) => {
      const currentRotation = currentSet[i];
      const targetRotation = targetSet[i];

      // Make sure that celestials only move clockwise
      const newRotation =
        targetRotation <= currentRotation
          ? targetRotation + 360
          : targetRotation;

      anime({
        targets: `.planet#${route}`,
        rotateZ: `${newRotation}deg`,
        delay: i * 100, // Spread the animations for smoother frame rate
        duration,
        easing,
        complete: function() {
          // Reset the position
          anime({
            targets: `.planet#${route}`,
            rotateZ: `${targetRotation}deg`,
            duration: 0
          });
          // End the animation
          if (route === 'services') {
            self.set('isAnimating', false);
          }
        }
      });
    });
  },

  scrollToTop() {
    scrollTo('#page-header', totalDuration, easing);
  },

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

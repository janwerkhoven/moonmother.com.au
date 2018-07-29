import Component from '@ember/component';
import { inject as service } from '@ember/service';
import { readOnly } from '@ember/object/computed';
import { scrollTo } from 'moonmother/helpers/scroll-to';

const totalDuration = 2600;
const easing = 'easeInOutCubic';
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

  router: service('-routing'),

  currentRoute: readOnly('router.currentRouteName'),

  collapsed: false,

  rotateCelestialsTo(targetRoute = 'index', instant = false) {
    const duration = instant ? 0 : totalDuration;

    const stance = this.collapsed ? 'half' : 'full';

    const currentSet = positions[stance][this.currentRoute];
    const targetSet = positions[stance][targetRoute];

    // TODO: DRY up below

    const currentIndex = currentSet[0];
    const currentAbout = currentSet[1];
    const currentServices = currentSet[2];

    const targetIndex = targetSet[0];
    const targetAbout = targetSet[1];
    const targetServices = targetSet[2];

    const newIndex =
      targetIndex <= currentIndex ? targetIndex + 360 : targetIndex;
    const newAbout =
      targetAbout <= currentAbout ? targetAbout + 360 : targetAbout;
    const newServices =
      targetServices <= currentServices ? targetServices + 360 : targetServices;

    anime({
      targets: '.planet#index',
      rotateZ: `${newIndex}deg`,
      delay: 0,
      duration,
      easing,
      complete: function() {
        anime({
          targets: '.planet#index',
          rotateZ: `${targetIndex}deg`,
          duration: 1
        });
      }
    });

    anime({
      targets: '.planet#about',
      rotateZ: `${newAbout}deg`,
      delay: 100, // Spread the animations for smoother frame rate
      duration,
      easing,
      complete: function() {
        anime({
          targets: '.planet#about',
          rotateZ: `${targetAbout}deg`,
          duration: 1
        });
      }
    });

    anime({
      targets: '.planet#services',
      rotateZ: `${newServices}deg`,
      delay: 200, // Spread the animations for smoother frame rate
      duration,
      easing,
      complete: function() {
        anime({
          targets: '.planet#services',
          rotateZ: `${targetServices}deg`,
          duration: 1
        });
      }
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

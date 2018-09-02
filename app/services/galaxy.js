import Service from '@ember/service';
import { inject as service } from '@ember/service';
import { computed } from '@ember/object';
import { readOnly, equal, or } from '@ember/object/computed';
import { scrollTo } from 'moonmother/helpers/scroll-to';

const celestials = ['index', 'about', 'services'];
const baseOrbits = {
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

export default Service.extend({
  fastboot: service(),
  router: service('router'),

  currentRoute: readOnly('router.currentRouteName'),
  isIndexRoute: equal('currentRoute', 'index'),
  isAboutRoute: equal('currentRoute', 'about'),
  isServicesRoute: equal('currentRoute', 'services'),
  isMainRoute: or('isIndexRoute', 'isAboutRoute', 'isServicesRoute'),

  isFirstPageLoad: true,
  lastOrbits: undefined,
  isAnimating: false,

  isFastBoot: readOnly('fastboot.isFastBoot'),

  stance: computed('isIndexRoute', function() {
    return this.isIndexRoute ? 'full' : 'half';
  }),

  // Animate the orbiting celestials in the {{page-header}} component
  rotateCelestials() {
    // Animations throw in Fastboot and also don't matter to bots
    if (this.isFastBoot) {
      return;
    }

    // All routes that are not index, about or services should take on the orbits of the services route.
    const currentRoute = this.isMainRoute ? this.currentRoute : 'services';

    const shouldAnimate = !this.isFirstPageLoad;
    const duration = shouldAnimate ? 2200 : 0;
    const easing = this.isAnimating ? 'easeOutCubic' : 'easeInOutCubic';
    // const stance = this.isIndexRoute ? 'full' : 'half';
    const self = this;

    // Compute the new orbit for each of the 3 celestials
    // Gotcha: Celestials should never move counter clockwise, hence we keep adding 360 degrees until more than last position.
    const newOrbits = [];
    celestials.forEach((name, i) => {
      let newOrbit = baseOrbits[this.stance][currentRoute][i];
      if (shouldAnimate) {
        let lastOrbit = this.lastOrbits[i];
        let count = 0; // To prevent infinite loop if bugged
        while (newOrbit < lastOrbit && count < 100) {
          newOrbit += 360;
          count++;
        }
      }
      newOrbits.push(newOrbit);
    });

    this.set('lastOrbits', newOrbits); // Remember for next animation
    this.set('isFirstPageLoad', false);
    this.set('isAnimating', true);

    // Animate the celestials to the new orbit
    celestials.forEach((name, i) => {
      const newOrbit = newOrbits[i];

      anime({
        targets: `#page-header .celestial.${name}`,
        rotateZ: `${newOrbit}deg`,
        delay: i * 100, // Spread the animations for smoother frame rate
        duration,
        easing,
        complete: function() {
          // Reset the position
          anime({
            targets: `#page-header .celestial.${name}`,
            rotateZ: `${newOrbit}deg`,
            duration: 0
          });
          if (name === 'services') {
            self.set('isAnimating', false);
          }
        }
      });
    });

    // Scroll to the top of the page to see animation in full
    if (shouldAnimate) {
      scrollTo('#page-header', duration, easing);
    }
  }
});

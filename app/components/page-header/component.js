import Ember from 'ember';
import $ from "jquery";
// import { computed } from "@ember/object";
// import { inject as service } from "@ember/service";

const { computed, inject } = Ember;

let positions = [-90, 0, 90];
let degrees = [-90, 0, 90];
const baseDuration = 2600;

export default Ember.Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'collapsed:collapsed'],
  router: inject.service('-routing'),
  currentRoute: computed.alias('router.currentRouteName'),

  rotateCelestialsTo(id, first) {
    if (first) {
      if (id === 'about') {
        positions = [-90, 0, 90];
      } else if (id === 'services') {
        positions = [90, -90, 0];
      } else {
        positions = [0, 90, -90];
      }
    } else {
      if (id === 'about') {
        positions = [-60, 0, 60];
      } else if (id === 'services') {
        positions = [60, -60, 0];
      } else {
        positions = [0, 60, -60];
      }
    }
    const duration = first ? 0 : baseDuration;
    $(`.planet`).each(function(i) {
      if ($(this).hasClass('velocity-animating')) { return; }
      const currentPos = degrees[i];
      let targetPos = positions[i];
      let newPos = targetPos <= currentPos ? targetPos + 360 : targetPos;
      $(this).velocity('stop').velocity({
        rotateZ: `${newPos}deg`
      }, {
        duration,
        easing: 'easeInOutCubic',
        complete: function() {
          $(this).velocity({ rotateZ: `${targetPos}deg` }, 0);
          degrees[i] = targetPos;
        }
      })
    });
  },

  scrollToTop() {
    const duration = baseDuration;
    $('header').velocity('scroll', {
      duration,
      easing: 'easeOutQuint',
      begin() {
        $('body').addClass('prevent-scroll');
      },
      complete() {
        $('body').removeClass('prevent-scroll');
      }
    });
  },

  actions: {

    collapseGalaxy(event) {
      const id = event.currentTarget.id;
      if (id === this.get('currentRoute')) { return; }
      this.rotateCelestialsTo(id);
      this.scrollToTop();
      this.set('collapsed', true);
    },

    expandGalaxy() {
      this.rotateCelestialsTo('index');
      this.set('collapsed', false);
    },

    moonGlow(boolean) {
      this.set('moonGlow', boolean);
      Ember.$('body').toggleClass('moon', boolean);

      // Ember.$('body').addClass('prevent-scroll');
      //
      // run.later(this, function() {
      //   Ember.$('body').removeClass('prevent-scroll');
      // }, 4000);

      Ember.$('header').velocity('scroll', {
        duration: 4000,
        easing: 'easeOutQuint',
        begin() {
          Ember.$('body').addClass('prevent-scroll');
        },
        complete() {
          Ember.$('body').removeClass('prevent-scroll');
        }
      });

      // const $pageHeader = this.$();
      // const $constelation = this.$('#constelation');
      //
      // const moon = this.get('moonGlow');
      // const pageHeaderHeight = moon ? '29vh' : '100vh';
      // const constelationHeight = moon ? '38vh' : '100'
      //
      //
      // $pageHeader.velocity('stop').velocity({
      //   height: pageHeaderHeight
      // }, 4000, 'easeOutExpo');
      //
      // $constelation.velocity('stop').velocity({
      //   height: 38vh;
      //   width: 38vh;
      //   transform: translate(-19vh, -19vh);
      // });
    }
  },

  didInsertElement() {
    this.rotateCelestialsTo(this.get('currentRoute'), true);
  }
});

import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  tagName: 'header',
  elementId: 'page-header',
  classNameBindings: ['currentRoute', 'moonGlow:moon:owl'],
  router: inject.service('-routing'),
  currentRoute: computed.alias('router.currentRouteName'),
  moonGlow: false,

  actions: {
    moonGlow(boolean) {
      this.set('moonGlow', boolean);
    }
  }
});

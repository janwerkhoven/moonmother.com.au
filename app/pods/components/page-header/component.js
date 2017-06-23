import Ember from 'ember';

const { computed, inject } = Ember;

export default Ember.Component.extend({
  classNameBindings: ['currentRoute'],
  tagName: 'header',
  elementId: 'page-header',
  router: inject.service('-routing'),
  currentRoute: computed.alias('router.currentRouteName')
});

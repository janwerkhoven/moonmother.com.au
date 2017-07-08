import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'home-page',
  contact: inject.service(),
  actions: {
    scrollToContact() {
      this.get('contact').scrollToMe();
    }
  }
});

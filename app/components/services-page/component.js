import Ember from 'ember';

const { inject } = Ember;

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'services-page',
  contact: inject.service(),
  actions: {
    scrollToContact() {
      this.get('contact').scrollToMe();
    }
  }
});

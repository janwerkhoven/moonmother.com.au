import { inject as service } from '@ember/service';
import Component from '@ember/component';

export default Component.extend({
  tagName: 'main',
  elementId: 'home-page',
  contact: service(),
  actions: {
    scrollToContact() {
      this.contact.scrollToMe();
    }
  }
});

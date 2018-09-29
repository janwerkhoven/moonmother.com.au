import Component from '@ember/component';
import { scrollTo } from 'moonmother/helpers/scroll-to';

export default Component.extend({
  tagName: 'main',
  classNames: ['page-content'],

  actions: {
    scrollToContact() {
      scrollTo('footer #contact', 3200, 'easeInOutQuint');
    }
  }
});

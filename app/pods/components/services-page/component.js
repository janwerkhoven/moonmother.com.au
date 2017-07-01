import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'services-page',
  actions: {
    scrollToContact() {
      Ember.$('#contact').velocity('scroll', {
        duration: 3200,
        easing: 'easeInOutQuint',
        begin() {
          Ember.$('body').addClass('prevent-scroll');
        },
        complete() {
          Ember.$('body').removeClass('prevent-scroll');
        }
      });
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'main',
  elementId: 'services-page',
  actions: {
    scrollToContact() {
      Ember.$('#contact').velocity('scroll', {
        duration: 1000,
        easing: 'easeOutExpo',
        begin: function() {
          Ember.$('body').addClass('prevent-scroll');
        },
        complete: function() {
          Ember.$('body').removeClass('prevent-scroll');
        }
      });
    }
  }
});

import Ember from 'ember';

export default Ember.Component.extend({
  tagName: 'section',
  elementId: 'what-we-do',
  lightbox: null,
  actions: {
    openLightbox(event) {
      const id = event.currentTarget.id;
      this.set('lightbox', id);
      Ember.$('body').addClass('prevent-scroll');
    },
    closeLightbox() {
      this.set('lightbox', null);
      Ember.$('body').removeClass('prevent-scroll');
    },
    mouseEnter(event) {
      const id = event.currentTarget.id;
      this.$(`figure#${id}`).velocity('stop').velocity({
        opacity: 1
      }, 300, 'ease-out').siblings().velocity('stop').velocity({
        opacity: 0.6
      }, 300, 'ease-out');
    },
    mouseLeave(event) {
      const id = event.currentTarget.id;
      this.$('figure').velocity('stop').velocity({
        opacity: 1
      }, 300, 'ease-out');
    },
  }
});

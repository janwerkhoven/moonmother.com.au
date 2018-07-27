import Component from '@ember/component';

export default Component.extend({
  tagName: 'section',
  elementId: 'what-we-do',

  lightbox: null,

  actions: {
    openLightbox(event) {
      const id = event.currentTarget.id;
      this.set('lightbox', id);
      document.body.classList.add('prevent-scroll');
    },
    closeLightbox() {
      this.set('lightbox', null);
      document.body.classList.remove('prevent-scroll');
    },
    mouseEnter(event) {
      const id = event.currentTarget.id;
      anime({
        targets: `figure#${id}`,
        opacity: 1,
        duration: 300,
        easing: 'easeOutExpo'
      });
      anime({
        targets: `figure:not(#${id})`,
        opacity: 0.6,
        duration: 300,
        easing: 'easeOutExpo'
      });
    },
    mouseLeave() {
      anime({
        targets: 'figure',
        opacity: 1,
        duration: 300,
        easing: 'easeOutExpo'
      });
    }
  }
});

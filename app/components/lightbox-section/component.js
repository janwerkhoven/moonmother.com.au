import $ from 'jquery';
import Component from '@ember/component';

// TODO: Remove jQuery from this page (does not run in Fastboot)

export default Component.extend({
  tagName: 'section',
  elementId: 'what-we-do',
  lightbox: null,
  actions: {
    openLightbox(event) {
      const id = event.currentTarget.id;
      this.set('lightbox', id);
      // TODO: Replace jQuery
      // $('body').addClass('prevent-scroll');
    },
    closeLightbox() {
      this.set('lightbox', null);
      // TODO: Replace jQuery
      // $('body').removeClass('prevent-scroll');
    },
    mouseEnter(event) {
      const id = event.currentTarget.id;
      // TODO: jQuery breaks Fastboot
      // this.$(`figure#${id}`)
      //   .velocity('stop')
      //   .velocity(
      //     {
      //       opacity: 1
      //     },
      //     300,
      //     'ease-out'
      //   )
      //   .siblings()
      //   .velocity('stop')
      //   .velocity(
      //     {
      //       opacity: 0.6
      //     },
      //     300,
      //     'ease-out'
      //   );
    },
    mouseLeave() {
      // TODO: jQuery breaks Fastboot
      // this.$('figure')
      //   .velocity('stop')
      //   .velocity(
      //     {
      //       opacity: 1
      //     },
      //     300,
      //     'ease-out'
      //   );
    }
  }
});

import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({
  scrollToMe() {
    // TODO: Velocity breaks Fastboot
    // $('#contact').velocity('scroll', {
    //   duration: 3200,
    //   easing: 'easeInOutQuint',
    //   begin() {
    //     $('body').addClass('prevent-scroll');
    //   },
    //   complete() {
    //     $('body').removeClass('prevent-scroll');
    //   }
    // });
  }
});

import $ from 'jquery';
import Service from '@ember/service';

export default Service.extend({

  scrollToMe() {
    $('#contact').velocity('scroll', {
      duration: 3200,
      easing: 'easeInOutQuint',
      begin() {
        $('body').addClass('prevent-scroll');
      },
      complete() {
        $('body').removeClass('prevent-scroll');
      }
    });
  }

});

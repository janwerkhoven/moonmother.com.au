import Service from '@ember/service';

export default Service.extend({
  // TODO: Log to Sentry
  log(msg, meta) {
    console.error(msg, meta);
  }
});

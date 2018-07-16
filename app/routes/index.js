import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  seo: service(),

  afterModel() {
    get(this, 'seo').setMetaTags(this, {
      title: 'Moon Mother',
      description: 'some generic description',
      canonical: 'https://moonmother.com.au/'
    });
  }
});

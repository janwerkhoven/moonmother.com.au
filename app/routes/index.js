import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  seo: service(),

  afterModel() {
    const seoService = get(this, 'seo');
    seoService.setMetaTags(this, {
      title: 'aaa',
      description: 'uuu',
      canonical: 'https://moonmother.com.au/',
      index: true,
      follow: true
    });
  }
});

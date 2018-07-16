import Route from '@ember/routing/route';
import { get } from '@ember/object';

export default Route.extend({
  afterModel() {
    const seoService = get(this, 'seo');
    seoService.setMetaTags(this, {
      title: 'Services',
      description: `With our comprehensive list of event production services, know you're in capable hands. If you need assistance with choosing and planning your event, allow one of our experts to help you.`,
      canonical: 'https://moonmother.com.au/services',
      index: true,
      follow: true
    });
  }
});

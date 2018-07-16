import Route from '@ember/routing/route';
import { get } from '@ember/object';
import { inject as service } from '@ember/service';

export default Route.extend({
  headTags() {
    // here we are pulling meta data from the model for this route
    let model = this.modelFor(this.routeName);
    return [
      {
        type: 'meta',
        tagId: 'meta-description-tag',
        attrs: {
          name: 'description',
          content: 'AAAAAAAAAAAH!'
        }
      }
    ];
  }

  // headTags: [
  //   {
  //     type: 'meta',
  //     tagId: 'meta-og-name',
  //     attrs: {
  //       property: 'og:name',
  //       content: 'Ice-T'
  //     }
  //   },
  //   {
  //     type: 'link',
  //     tagId: 'canonical-link',
  //     attrs: {
  //       rel: 'canonical',
  //       content: 'http://mydomain.org/'
  //     }
  //   }
  // ]

  // seo: service(),
  //
  // afterModel() {
  //   get(this, 'seo').setMetaTags(this, {
  //     title: 'About Us',
  //     description: 'something about us',
  //     canonical: 'https://moonmother.com.au/about'
  //   });
  // }
});
